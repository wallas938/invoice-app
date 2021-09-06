import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', component: LoginPageComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'user-account', loadChildren: () => import('../user-account/user-account.module').then(m => m.UserAccountModule) },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HomeRoutingModule { }