import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.scss'],
})
export class CompanySettingsComponent implements OnInit {
  public companySettings!: FormGroup;
  constructor() {}

  ngOnInit() {
    this.companySettingsFormInit();
  }

  private companySettingsFormInit(): void {
    this.companySettings = new FormGroup({
      companyName: new FormControl('Delta Technologies', [Validators.required]),
      contactPerson: new FormControl('Mclaren', [Validators.required]),
      address: new FormControl('Penning street', [Validators.required]),
      country: new FormControl('USA', [Validators.required]),
      city: new FormControl('Nyanose', [Validators.required]),
      state: new FormControl('Alabama', [Validators.required]),
      postalCode: new FormControl('845321', [Validators.required]),
      email: new FormControl('mclaren@deltaTechnologies.com', [
        Validators.required,
      ]),
      phoneNumber: new FormControl('071-654124', [Validators.required]),
      mobileNumber: new FormControl('8547522541', [Validators.required]),
      fax: new FormControl('012-456213', [Validators.required]),
      website: new FormControl('www.deltaTechnologies.com', [
        Validators.required,
      ]),
    });
  }
}
