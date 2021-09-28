import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { UserAccountRoutingModule } from './user-account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserAccountComponent } from './user-account.component';
import { UserResolver } from './resolvers/user.resolver';
import { InvoiceListItemComponent } from './components/invoice-list-item/invoice-list-item.component';

@NgModule({
  declarations: [
    InvoiceListComponent,
    UserAccountComponent,
    InvoiceListItemComponent
  ],
  imports: [
    CommonModule, UserAccountRoutingModule, SharedModule
  ],
  providers: [UserResolver]
})
export class UserAccountModule { }
