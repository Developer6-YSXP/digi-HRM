import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.scss'],
})
export class JobViewComponent implements OnInit {
  public routes = routes;
  personalInfoForm!: FormGroup;

  ngOnInit(): void {
    this.personalInfoFormInit();
  }

  private personalInfoFormInit(): void {
    this.personalInfoForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      message: new FormControl(''),
      cv: new FormControl(''),
    });
  }
}
