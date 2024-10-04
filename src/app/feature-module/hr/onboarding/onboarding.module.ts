import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { DocumentVerificationComponent } from './document-verification/document-verification.component';
import { SharedModule } from 'src/app/shared/shared.module';
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

@NgModule({
  declarations: [
    OnboardingComponent,
    DocumentVerificationComponent,
    AppointmentScheduleComponent,
     ConfirmationProcessComponent,
     InterviewFeedbackComponent,
     MultiPayrollComplianceComponent,
     PayrollConfigurationInterfaceComponent,
     OnboardingChecklistManagementComponent,
     HirePortalComponent,
     ReportingAnalyticsComponent,
     OfferLetterComponent,
     TaskAutomationComponent
  ],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    SharedModule
  ]
})
export class OnboardingModule {}
