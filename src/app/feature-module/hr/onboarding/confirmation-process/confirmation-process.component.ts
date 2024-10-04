import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/core.index';
@Component({
  selector: 'app-confirmation-process',
  templateUrl: './confirmation-process.component.html',
  styleUrl: './confirmation-process.component.scss'
})
export class ConfirmationProcessComponent {
  public routes = routes;
  confirmationForm!: FormGroup;
  showRejectionReason = false;
  showRescheduleOption = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.confirmationForm = this.fb.group({
      appointmentId: ['', Validators.required],
      employeeName: ['', Validators.required],
      employeeId: ['', Validators.required],
      reason: ['', Validators.required],
      rescheduleDate: ['', Validators.required],
      followUpNotification: ['Yes', Validators.required],
      comments: [''],
    });
  }

  confirmAppointment(isAccepted: boolean): void {
    this.showRejectionReason = !isAccepted;
    this.showRescheduleOption = !isAccepted;

    if (isAccepted) {
      
      this.confirmationForm.controls['reason'].reset();
      this.confirmationForm.controls['rescheduleDate'].reset();
    }
  }

  onSubmit(): void {
    if (this.confirmationForm.valid) {
      console.log('Form Submission:', this.confirmationForm.value);

       
      if (this.showRejectionReason) {
        console.log('Appointment Rejected with Reason');
      } else {
        console.log('Appointment Accepted');
      }

      
      if (this.confirmationForm.value.followUpNotification === 'Yes') {
        console.log('Follow-up Notification will be sent');
      } else {
        console.log('No Follow-up Notification will be sent');
      }

      
    } else {
      console.log('Form is invalid');
    }
  }
}