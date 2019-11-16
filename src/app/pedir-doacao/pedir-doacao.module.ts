import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PedirDoacaoPage } from './pedir-doacao.page';

const routes: Routes = [
  {
    path: '',
    component: PedirDoacaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PedirDoacaoPage]
})
export class PedirDoacaoPageModule {}
