import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.scss'],
})
export class EmailSettingsComponent implements OnInit {
  public emailSettings!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.emailFormInit();
  }

  private emailFormInit(): void {
    this.emailSettings = new FormGroup({
      phpMail: new FormControl('', Validators.required),
      smtp: new FormControl('', Validators.required),
      emailAddress: new FormControl('', Validators.required),
      emailName: new FormControl('', Validators.required),
      smtpHost: new FormControl('', Validators.required),
      smtpUser: new FormControl('', Validators.required),
      smtpPassword: new FormControl('', Validators.required),
      smtpPort: new FormControl('', Validators.required),
      smtpSecurity: new FormControl('', Validators.required),
      smtpAuthentication: new FormControl('', Validators.required),
    });
  }
}
