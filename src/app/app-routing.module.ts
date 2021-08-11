import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './home/components/login-page/login-page.component';
import { SignUpComponent } from './home/components/sign-up/sign-up.component';

const routes: Routes = [
  { path: '',  redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component:  LoginPageComponent },
  { path: 'sign-up', component:  SignUpComponent }
  /*{ path: 'user-interface', loadChildren: () => import('../app/user-interface/user-interface.module').then(m => m.UserInterfaceModule)},
  { path: '**', redirectTo: '/home', pathMatch: 'full' } */
];

@NgModule({
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }