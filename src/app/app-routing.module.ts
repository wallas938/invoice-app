import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceListComponent } from './user-account/components/invoice-list/invoice-list.component';
import { UserAccountModule } from './user-account/user-account.module';
const routes: Routes = [
  // { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'home', component: InvoiceListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UserAccountModule], // ***Enlever UserAccountModule
  exports: [RouterModule]
})
export class AppRoutingModule { }
