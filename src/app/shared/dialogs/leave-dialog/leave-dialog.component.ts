import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentDailog } from 'src/app/core/core.index';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-leave-dialog',
  templateUrl: './leave-dialog.component.html',
  styleUrl: './leave-dialog.component.scss',
})
export class LeaveDialogComponent {
  leaveForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DepartmentDailog,
    public dialogRef: MatDialogRef<LeaveDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
    console.log('Dialog data:', this.data);
  }

  initForm(): void {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    this.leaveForm = new FormGroup({
      leaveType: new FormControl('', [Validators.required]),
      fromDate: new FormControl(today, [Validators.required]),
      toDate: new FormControl(tomorrow, [Validators.required]),
      days: new FormControl('', [Validators.required]),
      remainingLeaves: new FormControl(12, [Validators.required]),
      reason: new FormControl('', [Validators.required]),
    });

    // Subscribe to changes in fromDate and toDate
    this.c['fromDate'].valueChanges.subscribe(() =>
      this.calculateDays(this.c['fromDate'].value, this.c['toDate'].value)
    );
    this.c['toDate'].valueChanges.subscribe(() =>
      this.calculateDays(this.c['fromDate'].value, this.c['toDate'].value)
    );

    // Initial calculation
    this.calculateDays(this.c['fromDate'].value, this.c['toDate'].value);
  }

  get c(): { [key: string]: AbstractControl } {
    return this.leaveForm.controls;
  }

  calculateDays(date1: string, date2: string): void {
    // Convert the date strings to Date objects
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    // Get the time difference in milliseconds
    const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());

    // Convert time difference from milliseconds to days
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    this.c['days'].setValue(dayDifference, { emitEvent: false });
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.leaveForm.invalid) {
      // this.dialogRef.close(this.departmentName);
      return;
    }
  }
}
