import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomTemplateComponent } from './custom-template/custom-template.component';
import { TemplatesComponent } from './templates.component';

@NgModule({
  declarations: [CustomTemplateComponent, TemplatesComponent],
  imports: [CommonModule, TemplatesRoutingModule, SharedModule],
})
export class TemplatesModule {}
