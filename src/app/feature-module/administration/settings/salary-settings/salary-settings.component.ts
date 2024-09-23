import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-salary-settings',
  templateUrl: './salary-settings.component.html',
  styleUrls: ['./salary-settings.component.scss'],
})
export class SalarySettingsComponent implements OnInit {
  public salarySettings!: FormGroup;
  constructor() {}

  ngOnInit() {
    this.salaryFormInit();
  }

  private salaryFormInit(): void {
    this.salarySettings = new FormGroup({
      da: new FormControl('', Validators.required),
      hra: new FormControl('', Validators.required),
      employeeShare: new FormControl('', Validators.required),
      organisationShare: new FormControl('', Validators.required),
      esiEmployeeShare: new FormControl('', Validators.required),
      esiOrganisationShare: new FormControl('', Validators.required),
      annualSalaryFrom1: new FormControl('', Validators.required),
      annualSalaryTo1: new FormControl('', Validators.required),
      annualpercentage1: new FormControl('', Validators.required),
      annualSalaryFrom2: new FormControl('', Validators.required),
      annualSalaryTo2: new FormControl('', Validators.required),
      annualpercentage2: new FormControl('', Validators.required),
    });
  }
}
