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

  constructor() {
    setTimeout(() => {
      this.carregamentoInicial = true;
    }, 3000);
  }

  abrirInstituicao() {
    this.openInstituicao = true;
    this.controllerAll = true;
  }

  voltarPaginaInicial(){
    this.openInstituicao = false;
    this.carregamentoInicial = true;
    this.controllerAll = false;
  }
}
