import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/core.index';


@Component({
  selector: 'app-multi-payroll-compliance',
  templateUrl: './multi-payroll-compliance.component.html',
  styleUrl: './multi-payroll-compliance.component.scss'
})
export class MultiPayrollComplianceComponent {
  public routes = routes;
  payrollConfigs = [
 
    { region: 'North America', role: 'Manager', payrollRule: 'Rule 1', externalSystem: 'System A', notification: 'Yes' },
    { region: 'Europe', role: 'Software Engineer', payrollRule: 'Rule 2', externalSystem: 'System B', notification: 'No' },
  ];

  auditLogs = [
    
    { timestamp: '2024-10-03 12:00', region: 'North America', role: 'Manager', action: 'Updated Rule', changedBy: 'HR Admin' },
    { timestamp: '2024-10-02 09:00', region: 'Europe', role: 'Software Engineer', action: 'Added Rule', changedBy: 'HR Admin' },
  ];

  payrollForm!: FormGroup;
  regions = ['North America', 'Europe', 'Asia', 'Australia'];
  roles = ['Manager', 'Software Engineer', 'HR', 'Sales', 'Finance'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.payrollForm = this.fb.group({
      region: ['', Validators.required],
      role: ['', Validators.required],
      payrollRule: ['', Validators.required],
      externalSystem: [''],
      notification: ['Yes', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.payrollForm.valid) {
      console.log(this.payrollForm.value);
     
    }
  }
  editConfig(config: any): void {
     
    console.log('Editing config:', config);
  }
}
