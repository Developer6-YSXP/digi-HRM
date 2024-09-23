import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { DataService, routes } from 'src/app/core/core.index';
import { FormControl, FormGroup, Validators } from '@angular/forms';
export interface datasModel {
  name: string;
}

@Component({
  selector: 'app-account-content-page',
  templateUrl: './account-content-page.component.html',
  styleUrl: './account-content-page.component.scss',
})
export class AccountContentPageComponent implements OnInit {
  public routes = routes;
  basicInfoForm!: FormGroup;
  companyAddressForm!: FormGroup;
  socialDetailsForm!: FormGroup;
  accessForm!: FormGroup;
  exportForm!: FormGroup;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  data1: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];
  data2: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  ngOnInit(): void {
    this.basicFormInit();
    this.addressFormInit();
    this.socialFormInit();
    this.accessFormInit();
    this.exportFormInit();
  }

  private basicFormInit(): void {
    this.basicInfoForm = new FormGroup({
      profilePic: new FormControl(''),
      companyName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone1: new FormControl('', Validators.required),
      phone2: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      website: new FormControl(''),
      reviews: new FormControl('', Validators.required),
      owner: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required),
      deals: new FormControl('', Validators.required),
      industry: new FormControl('', Validators.required),
      source: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      aboutCompany: new FormControl('', Validators.required),
    });
  }

  private addressFormInit(): void {
    this.companyAddressForm = new FormGroup({
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
    });
  }

  private socialFormInit(): void {
    this.socialDetailsForm = new FormGroup({
      facebook: new FormControl(''),
      twitter: new FormControl(''),
      linkedin: new FormControl(''),
      skype: new FormControl(''),
      whatsapp: new FormControl(''),
      instagram: new FormControl(''),
    });
  }

  private accessFormInit(): void {
    this.accessForm = new FormGroup({
      visibility: new FormControl(''),
      status: new FormControl(''),
    });
  }

  private exportFormInit(): void {
    this.exportForm = new FormGroup({
      fields: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });
  }

  trackByFn(index: number, item: datasModel) {
    return item.name;
  }

  add(event: MatChipInputEvent, val: datasModel[]): void {
    const value = (event.value || '').trim();
    if (value) {
      val.push({ name: value });
    }
    event.chipInput?.clear();
  }

  remove(values: datasModel[], val: number): void {
    if (val >= 0) {
      values.splice(val, 1);
    }
  }

  edit(val: datasModel[], index: number, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(val, index);
      return;
    }
    if (index >= 0) {
      val[index].name = value;
    }
  }
  activeTab = 'activities';
  activeStep = 0;
  public selectedFieldSet = [0];
  currentStep = 0;

  activateTab(tabName: string) {
    this.activeTab = tabName;
  }
  setActiveStep(step: number) {
    this.activeStep = step;
  }
  nextStep() {
    this.currentStep++;
  }
  public filter = false;
  public rating = false;

  openFilter() {
    this.filter = !this.filter;
  }
  openRating() {
    this.rating = !this.rating;
  }
  constructor(private data: DataService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  elem = document.documentElement;
  fullscreen() {
    if (!document.fullscreenElement) {
      this.elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}
