import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './onboarding.component';
import { OfferLetterComponent } from './offer-letter/offer-letter.component';

const routes: Routes = [
  {
    path: '',
    component: OnboardingComponent,
    children: [{ path: 'offer-letter', component: OfferLetterComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingRoutingModule {}
