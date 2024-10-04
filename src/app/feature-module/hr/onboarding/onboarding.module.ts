import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';
import { OfferLetterComponent } from './offer-letter/offer-letter.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [OnboardingComponent, OfferLetterComponent],
  imports: [CommonModule, OnboardingRoutingModule, SharedModule],
})
export class OnboardingModule {}
