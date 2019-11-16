import { Component, OnInit } from "@angular/core";

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from './domains/service/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})


export class HomePage implements OnInit{
  carregamentoInicial: boolean;
  openInstituicao: boolean;
  controllerAll: boolean;
  cadastroInstituicao: boolean;
  abrirListaDoacao: boolean;
  public listaDoacoes: Array<any>;
  public listaDoacoesFiltradas: Array<any>;

  // error
  public erro: any;


  //login
  public username: string;
  public password: string;


  emailCadastro: string = "";
  senhaCadastro: string = "";

  async ngOnInit(){
    if(await this.user.isAuthenticated()){
      this.router.navigate(['/instituicao'])
    }else{
      this.router.navigate(['/home'])
    }
  }
  // tslint:disable-next-line: max-line-length
  constructor(public afAuth: AngularFireAuth, public afstore: AngularFirestore, public user: UserService, public router: Router, public alertController: AlertController, private db: AngularFireDatabase) {
    setTimeout(() => {
      this.carregamentoInicial = true;
    }, 3000);
  }


  async submitLogin(usuario, senha) {
    const { username, password } = this
    try {
      // kind of a hack. 
      const res = await this.afAuth.auth.signInWithEmailAndPassword(usuario, senha)

      if (res.user) {
        this.user.setUser({
          username,
          uid: res.user.uid
        });
        this.router.navigate(['/instituicao'])
      }

    } catch (error) {
      this.presentAlert('Error', error.message);
    }
  }


  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })

    await alert.present();
  }


  async register() {
    const { emailCadastro, senhaCadastro } = this
 
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(emailCadastro, senhaCadastro)

      this.afstore.doc(`users/${res.user.uid}`).set({
        emailCadastro
      })

      this.user.setUser({
        username: emailCadastro,
        uid: res.user.uid
      })

      this.presentAlert('Success', 'You are registered!')
      
      this.router.navigate(['/instituicao'])

    } catch (error) {
      this.presentAlert('Error', error.message)
    }
  }







  abrirInstituicao() {
    this.openInstituicao = true;
    this.controllerAll = true;
  }

  voltarPaginaInicial() {
    this.openInstituicao = false;
    this.carregamentoInicial = true;
    this.controllerAll = false;
    this.abrirListaDoacao = false;
    this.cadastroInstituicao = false;
  }

  abrirCadastroInstituicao() {
    this.openInstituicao = false;
    this.cadastroInstituicao = true;
  }

  abrirDoacao() {
    this.listaDoacoes = [];
    this.getAll();
    this.abrirListaDoacao = true;
    this.controllerAll = true;
    // this.carregarListaDoacoes();
    this.listaDoacoesFiltradas = this.listaDoacoes;
  }

  filterDoacoes(e) {
    if (e === 'todos' || e === '') {
      this.listaDoacoesFiltradas = this.listaDoacoes;
    } else {
      this.listaDoacoesFiltradas = this.listaDoacoes.filter(x => x.categoria.toLowerCase().includes(e.toLowerCase()));
    }

  }

  async getAll() {
    this.db.list('/listaDoacao').snapshotChanges().subscribe(res => {
      res.forEach(async doc => {
        this.listaDoacoes.push(doc.payload.val());
    });

  });
}


  carregarListaDoacoes() {
    this.listaDoacoes = [
      { nomeItem: 'Feijão', categoria: 'alimento', descricao: 'Precisamos de 30 kg de feijão' },
      { nomeItem: 'Dinheiro', categoria: 'dinheiro', descricao: 'Precisamos de 300 mil até o final do ano!' },
      { nomeItem: 'Ração', categoria: 'pets', descricao: 'Precisamos de 30 kg de ração' },
      { nomeItem: 'Roupa', categoria: 'roupa', descricao: 'Precisamos de agasalho' },
      { nomeItem: 'Lata de tinta', categoria: 'outros', descricao: 'Precisamos de lata de tinta' },
    ];
  }
}
