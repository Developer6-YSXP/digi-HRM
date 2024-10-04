import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentVerificationComponent } from './document-verification/document-verification.component';
import { OnboardingComponent } from './onboarding.component';
import { AppointmentScheduleComponent } from './appointment-schedule/appointment-schedule.component';
import { OfferLetterComponent } from './offer-letter/offer-letter.component';
import { ConfirmationProcessComponent } from './confirmation-process/confirmation-process.component';
import { HirePortalComponent } from './hire-portal/hire-portal.component';
import { InterviewFeedbackComponent } from './interview-feedback/interview-feedback.component';
import { MultiPayrollComplianceComponent } from './multi-payroll-compliance/multi-payroll-compliance.component';
import { OnboardingChecklistManagementComponent } from './onboarding-checklist-management/onboarding-checklist-management.component';
import { PayrollConfigurationInterfaceComponent } from './payroll-configuration-interface/payroll-configuration-interface.component';
import { ReportingAnalyticsComponent } from './reporting-analytics/reporting-analytics.component';
import { TaskAutomationComponent } from './task-automation/task-automation.component';

const routes: Routes = [
  {
    path: '',
    component: OnboardingComponent,
    children:[
       { path:'document-verify',  component: DocumentVerificationComponent },
       { path: 'appointment', component:AppointmentScheduleComponent },
       { path: 'offer-letter', component: OfferLetterComponent },
       { path: 'confirmation', component: ConfirmationProcessComponent },
       { path: 'interview-feedback', component: InterviewFeedbackComponent },
       { path: 'multi-payroll', component: MultiPayrollComplianceComponent },
       { path: 'payroll-confirguration', component: PayrollConfigurationInterfaceComponent },
       { path: 'onboarding-checklist', component: OnboardingChecklistManagementComponent },
       { path: 'hire-portal', component: HirePortalComponent },
       { path: 'reporting-analytics', component: ReportingAnalyticsComponent },
       { path: 'task-automation', component: TaskAutomationComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingRoutingModule {}
