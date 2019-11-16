import { Component, OnInit } from '@angular/core';
import { UserService } from '../home/domains/service/user.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-instituicao',
  templateUrl: './instituicao.page.html',
  styleUrls: ['./instituicao.page.scss'],
})
export class InstituicaoPage implements OnInit {
  public abrirCadastroInsituicao: boolean;
  public nomeItem: string;
  public categoria: string;
  public descricao: string;
  public endereco: string;
  public telefone: string;
  public email: string;
  public listaDoacoes: any = [];

  constructor(public user: UserService, public router: Router, private afs: AngularFirestore, private db: AngularFireDatabase) { }

  async ngOnInit() {
    if (await this.user.isAuthenticated()) {

    } else {
      this.router.navigate(['/home'])
    }

    this.getAll();
  }

  abrirCadastroInstituicao() {
    this.abrirCadastroInsituicao = !this.abrirCadastroInsituicao;
    // console.log(this.abrirCadastroInsituicao)
  }

  async getAll() {
    this.db.list('/listaDoacao').snapshotChanges().subscribe(res => {
      res.forEach(async doc => {
        if (doc.payload.val()['email'] == await this.user.getUsername()) {
          const obj = new objListaDoacoes();
          obj.key = doc.payload.key;
          obj.value = doc.payload.val();
          this.listaDoacoes.push(obj);
        }

      });
      console.log(this.listaDoacoes);

    });
  }

  async delete(key: string) {
    await this.db.object(`listaDoacao/${key}`).remove();
    this.listaDoacoes = [];
    this.getAll();
  }


  logout() {
    this.user.logout();
    location.reload();
  }

  async registrar() {
    this.listaDoacoes = [];
    const listaDoacoesL = new ListaDoacoes();
    listaDoacoesL.nomeItem = this.nomeItem;
    listaDoacoesL.categoria = this.categoria;
    listaDoacoesL.descricao = this.descricao;
    listaDoacoesL.telefone = this.telefone;
    listaDoacoesL.endereco = this.endereco;
    listaDoacoesL.email = await this.user.getUsername();

    this.db.list('/listaDoacao')
      .push(listaDoacoesL)
      .then(r => console.log(r));

    this.nomeItem = '';
    this.categoria = '';
    this.descricao = '';
    this.telefone = '';
    this.endereco = '';
    // this.getAll();
    this.abrirCadastroInsituicao = !this.abrirCadastroInsituicao;
  }


  clearLocalStorage() {
    // indexedDB[''].deleteDatabase('firebase:authUser:AIzaSyDbGWumh_9tzFwCpfiYmOCVcmlXM5SYjMg');
  }

}


class objListaDoacoes {
  key: string;
  value: any;
}

class ListaDoacoes {
  nomeItem: string;
  categoria: string;
  descricao: string;
  telefone: string;
  endereco: string;
  email: string;
}

