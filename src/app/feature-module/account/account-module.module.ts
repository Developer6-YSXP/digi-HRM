import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountModuleRoutingModule } from './account-module-routing.module';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountComponent } from './account.component';
import { AccountContentPageComponent } from './account-content-page/account-content-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { ProjectsComponent } from './account-details/projects/projects.component';
import { EmployeesMatrixComponent } from './account-details/employees-matrix/employees-matrix.component';
import { DepartmentsComponent } from './account-details/departments/departments.component';

@NgModule({
  declarations: [
    AccountListComponent,
    AccountComponent,
    AccountContentPageComponent,
    AccountDetailsComponent,
    ProjectsComponent,
    EmployeesMatrixComponent,
    DepartmentsComponent,
  ],

  imports: [
    CommonModule,
    AccountModuleRoutingModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AccountModuleModule {}
