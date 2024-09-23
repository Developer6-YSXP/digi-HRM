import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApexchartsComponent } from './apexcharts.component';

const routes: Routes = [{ path: '', component: ApexchartsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApexchartsRoutingModule { }
