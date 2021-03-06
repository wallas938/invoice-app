import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth-guard/auth.guard';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';
import { InvoiceResolver } from './pages/invoice-detail/resolver/invoice.resolver';
import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';
import { UserResolver } from './resolvers/user.resolver';
import { UserAccountComponent } from './user-account.component';

const routes: Routes = [
  {
    path: '',
    component: UserAccountComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: InvoiceListComponent
      },
      {
        path: ':id',
        component: InvoiceDetailComponent,
        resolve: {
          invoiceDetail: InvoiceResolver
        }
      },
    ]
  }
];/*
    { path: '', redirectTo: 'invoices', pathMatch: 'full' },
    { path: '/invoices', component: InvoiceListComponent, pathMatch: 'full' },
    { path: '**', redirectTo: '/user-account', pathMatch: 'full' }
   */

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountRoutingModule { }
