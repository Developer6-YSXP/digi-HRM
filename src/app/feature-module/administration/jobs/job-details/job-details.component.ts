import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  public routes = routes;
  jobDetailsForm!: FormGroup;

  ngOnInit(): void {
    this.jobDetailsFormInit();
  }

  private jobDetailsFormInit(): void {
    this.jobDetailsForm = new FormGroup({
      title: new FormControl(''),
      department: new FormControl(''),
      location: new FormControl(''),
      vacancies: new FormControl(''),
      experience: new FormControl(''),
      age: new FormControl(''),
      salaryFrom: new FormControl(''),
      salaryTo: new FormControl(''),
      jobType: new FormControl(''),
      status: new FormControl(''),
      startDate: new FormControl(''),
      expireDate: new FormControl(''),
      description: new FormControl(''),
    });
  }
}
