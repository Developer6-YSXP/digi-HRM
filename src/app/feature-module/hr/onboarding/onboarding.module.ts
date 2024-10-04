import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { DocumentVerificationComponent } from './document-verification/document-verification.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OnboardingComponent } from './onboarding.component';
import { AppointmentScheduleComponent } from './appointment-schedule/appointment-schedule.component';
import { OfferLetterComponent } from './offer-letter/offer-letter.component';

@NgModule({
  declarations: [
    OnboardingComponent,
    DocumentVerificationComponent,
    AppointmentScheduleComponent
  , OfferLetterComponent],
  imports: [CommonModule, OnboardingRoutingModule,
    SharedModule],
})
export class OnboardingModule {}
