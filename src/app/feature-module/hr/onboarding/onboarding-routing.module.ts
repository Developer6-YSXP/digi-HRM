import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentVerificationComponent } from './document-verification/document-verification.component';
import { OnboardingComponent } from './onboarding.component';
import { AppointmentScheduleComponent } from './appointment-schedule/appointment-schedule.component';
import { OfferLetterComponent } from './offer-letter/offer-letter.component';

const routes: Routes = [
  {
    path: '',
    component: OnboardingComponent,
    children:[
       { path:'document-verify',  component: DocumentVerificationComponent },
       { path: 'appointment', component:AppointmentScheduleComponent },
       { path: 'offer-letter', component: OfferLetterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingRoutingModule {}
