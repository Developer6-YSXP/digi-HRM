import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/core.index';

@Component({
  selector: 'app-payroll-configuration-interface',
  templateUrl: './payroll-configuration-interface.component.html',
  styleUrl: './payroll-configuration-interface.component.scss'
})
export class PayrollConfigurationInterfaceComponent {
  public routes = routes;
 
  payrollForm!: FormGroup;
  locations = ['North America', 'Europe', 'Asia', 'Australia'];
  roles = ['Manager', 'Software Engineer', 'HR', 'Sales', 'Finance'];
  frequencies = ['Weekly', 'Bi-Weekly', 'Monthly'];
  complianceRules = ['Overtime', 'Tax Deductions', 'Minimum Wage'];

  constructor(private fb: FormBuilder) {}
 
  integrationLinks: { name: string; url: string }[] = [];

  
  alerts: { message: string }[] = [];

  
  complianceChecklist: string[] = [];

 
  auditLogs: { date: string; location: string; jobRole: string; changedBy: string; details: string }[] = [];


  ngOnInit(): void {
    
    this.payrollForm = this.fb.group({
      location: ['', Validators.required],
      jobRole: ['', Validators.required],
      frequency: ['', Validators.required],
      complianceRules: [[], Validators.required],
      salary: ['', Validators.required],
      bonus: [''],
      deductions: [''],
      taxCode: ['', Validators.required],
      taxRate: ['', Validators.required],
      payrollType: ['full-time', Validators.required],
    });

    // Initialize integration links
    this.integrationLinks = [
      { name: 'External Payroll System A', url: 'https://example.com/systemA' },
      { name: 'External Payroll System B', url: 'https://example.com/systemB' },
      { name: 'External Payroll System C', url: 'https://example.com/systemC' },
    ];

    // Initialize alerts with example messages
    this.alerts = [
      { message: 'Non-compliance with tax regulations for location XYZ' },
      { message: 'Missing tax code for new hire in jurisdiction ABC' },
    ];

    // Initialize compliance checklist with example rules
    this.complianceChecklist = [
      'Ensure minimum wage requirements',
      'Check overtime regulations',
      'Apply proper tax deductions',
    ];
    this.auditLogs = [
      {
        date: '2024-10-03',
        location: 'North America',
        jobRole: 'Software Engineer',
        changedBy: 'HR Admin',
        details: 'Updated tax rate and salary details.',
      },
      {
        date: '2024-09-29',
        location: 'Europe',
        jobRole: 'Manager',
        changedBy: 'HR Admin',
        details: 'Added bonus information.',
      },
    ];
  }
  
  onSubmit(): void {
    if (this.payrollForm.valid) {
      console.log(this.payrollForm.value);
      
    }
  }
}
