import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})


export class HomePage {
  carregamentoInicial: boolean;
  openInstituicao: boolean;
  controllerAll: boolean;
  cadastroInstituicao: boolean;
  abrirListaDoacao: boolean;
  public listaDoacoes: Array<any>;
  public listaDoacoesFiltradas: Array<any>;


  constructor() {
    setTimeout(() => {
      this.carregamentoInicial = true;
    }, 3000);
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
    this.abrirListaDoacao = true;
    this.controllerAll = true;
    this.carregarListaDoacoes();
    this.listaDoacoesFiltradas = this.listaDoacoes;
  }

  filterDoacoes(e) {
    if (e === 'todos' || e === '') {
      this.listaDoacoesFiltradas = this.listaDoacoes;
    }else{
      this.listaDoacoesFiltradas = this.listaDoacoes.filter(x => x.categoria.toLowerCase().includes(e.toLowerCase()));
    }
    
  }


  carregarListaDoacoes() {
    this.listaDoacoes = [
      { nomeItem: 'Feijão', categoria: 'alimento', descricao: 'Precisamos de 30 kg de feijão' },
      { nomeItem: 'Dinheiro', categoria: 'dinheiro', descricao: 'Precisamos de 300 mil até o final do ano!' },
      { nomeItem: 'Ração', categoria: 'pets', descricao: 'Precisamos de 30 kg de ração' },
      { nomeItem: 'Roupa', categoria: 'Roupa', descricao: 'Precisamos de agasalho' },
      { nomeItem: 'Lata de tinta', categoria: 'outros', descricao: 'Precisamos de lata de tinta' },
    ];
  }
}
