import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss'],
})
export class EmployeeModalComponent implements OnInit {
  public addEmployeeForm!: FormGroup;
  public editEmployeeForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // add employee form
    this.initAddEmployeeForm();
    this.initEditEmployeeForm();
  }

  initAddEmployeeForm(): void {
    this.addEmployeeForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      UserName: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      DepartmentName: new FormControl('', [Validators.required]),
      Designation: new FormControl('', [Validators.required]),
      ReportManager: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      JoinDate: new FormControl('', [Validators.required]),
      CompanyName: new FormControl('', [Validators.required]),
      EmployeeID: new FormControl('', [Validators.required]),
    });
  }

  initEditEmployeeForm(): void {
    this.addEmployeeForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      UserName: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      DepartmentName: new FormControl('', [Validators.required]),
      Designation: new FormControl('', [Validators.required]),
      ReportManager: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      JoinDate: new FormControl('', [Validators.required]),
      CompanyName: new FormControl('', [Validators.required]),
      EmployeeID: new FormControl('', [Validators.required]),
    });
  }
}
