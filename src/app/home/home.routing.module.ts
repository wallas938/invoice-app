import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from '../core/guards/auto-login.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', canActivate: [AutoLoginGuard], component: LoginPageComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'user-account/invoices', loadChildren: () => import('../user-account/user-account.module').then(m => m.UserAccountModule) },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
