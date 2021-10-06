import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoLoginGuard } from './core/guards/auto-login.guard';

const routes: Routes = [
  { path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
