import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountContentPageComponent } from './account-content-page/account-content-page.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

const routes: Routes = [
  { 
    path: '', 
    component: AccountComponent,
    children: [
      { path: "account-page", component:  AccountContentPageComponent},
      { path: "account-list", component: AccountListComponent },
      { path: "account-details", component: AccountDetailsComponent },
    ] 
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountModuleRoutingModule { }
