import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss'],
})
export class ProjectModalComponent implements OnInit {
  public projectForm!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.projectFormInit();
  }

  private projectFormInit(): void {
    this.projectForm = new FormGroup({
      projectName: new FormControl('', Validators.required),
      client: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      rate: new FormControl('', Validators.required),
      timeFormat: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      projectManager: new FormControl('', Validators.required),
      team: new FormControl('', Validators.required),
      productOwner: new FormControl('', Validators.required),
      scrumMaster: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required),
    });
  }
}
