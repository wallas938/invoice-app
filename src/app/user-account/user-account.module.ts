import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';
import { UserAccountRoutingModule } from './user-account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserAccountComponent } from './user-account.component';
import { UserResolver } from './resolvers/user.resolver';
import { InvoiceListItemComponent } from './pages/invoice-list/components/invoice-list-item/invoice-list-item.component';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';
import { InvoiceHeaderComponent } from './pages/invoice-detail/components/invoice-header/invoice-header.component';
import { InvoiceBodyComponent } from './pages/invoice-detail/components/invoice-body/invoice-body.component';
import { InvoiceResolver } from './pages/invoice-detail/resolver/invoice.resolver';
import { FilterComponent } from './pages/invoice-list/components/filter/filter.component';

@NgModule({
  declarations: [
    InvoiceListComponent,
    UserAccountComponent,
    InvoiceListItemComponent,
    InvoiceDetailComponent,
    InvoiceHeaderComponent,
    InvoiceBodyComponent,
    FilterComponent
  ],
  imports: [
    CommonModule, UserAccountRoutingModule, SharedModule
  ],
  providers: [UserResolver, InvoiceResolver]
})
export class UserAccountModule { }
