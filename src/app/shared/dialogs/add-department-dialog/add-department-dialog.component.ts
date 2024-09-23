import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  DepartmentDailog,
  getDepartment,
} from 'src/app/core/services/interface/models'; // Ensure this path is correct

@Component({
  selector: 'app-add-department-dialog',
  templateUrl: './add-department-dialog.component.html',
  styleUrls: ['./add-department-dialog.component.scss'], // Corrected property name
})
export class AddDepartmentDialogComponent implements OnInit {
  departmentName!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DepartmentDailog,
    public dialogRef: MatDialogRef<AddDepartmentDialogComponent>
  ) {}

  ngOnInit(): void {
    console.log('Dialog data:', this.data.departments);
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.departmentName) {
      this.dialogRef.close(this.departmentName);
    }
  }
}
