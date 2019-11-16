import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'loading-login', loadChildren: './loading-login/loading-login.module#LoadingLoginPageModule' },
  { path: 'instituicao', loadChildren: './instituicao/instituicao.module#InstituicaoPageModule' },
  { path: 'pedir-doacao', loadChildren: './pedir-doacao/pedir-doacao.module#PedirDoacaoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
