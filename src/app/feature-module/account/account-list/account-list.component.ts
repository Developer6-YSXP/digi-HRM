import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  DataService,
  apiResultFormat,
  companies,
  routes,
} from 'src/app/core/core.index';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { pageSelection } from 'src/app/feature-module/employee/employees/departments/departments.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
export interface datasModel {
  name: string;
}

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss',
})
export class AccountListComponent implements OnInit {
  public routes = routes;
  basicInfoForm!: FormGroup;
  companyAddressForm!: FormGroup;
  socialDetailsForm!: FormGroup;
  accessForm!: FormGroup;
  exportForm!: FormGroup;
  notesForm!: FormGroup;

  activeTab = 'activities';
  activeStep = 0;
  public selectedFieldSet = [0];
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  // pagination variables
  public companies: Array<companies> = [];
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  dataSource!: MatTableDataSource<companies>;
  public totalPages = 0;
  public searchDataValue = '';
  //** / pagination variables

  constructor(private data: DataService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.getTableData();
    this.basicFormInit();
    this.addressFormInit();
    this.socialFormInit();
    this.accessFormInit();
    this.exportFormInit();
    this.notesFormInit();
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
    this.accessForm = new FormGroup({
      fields: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });
  }

  private notesFormInit(): void {
    this.accessForm = new FormGroup({
      title: new FormControl(''),
      note: new FormControl(''),
      attachment: new FormControl(''),
    });
  }

  activateTab(tabName: string) {
    this.activeTab = tabName;
  }
  setActiveStep(step: number) {
    this.activeStep = step;
  }
  currentStep = 0;
  nextStep() {
    this.currentStep++;
  }

  private getTableData(): void {
    this.companies = [];
    this.serialNumberArray = [];

    this.data.getCompanies().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: companies, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.companies.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<companies>(this.companies);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  public sortData(sort: Sort) {
    const data = this.companies.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.companies = data;
    } else {
      this.companies = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.companies = this.dataSource.filteredData;
  }

  public getMoreData(event: string): void {
    if (event === 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event === 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData();
  }
  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 !== 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  data1: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];
  data2: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];

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
  public filter = false;
  public rating = false;

  openFilter() {
    this.filter = !this.filter;
  }
  openRating() {
    this.rating = !this.rating;
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
