import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/core.index';
import { routes } from 'src/app/core/helpers/routes/routes';
import {
  allLeaveType,
  Integration,
} from 'src/app/core/services/interface/models';

@Component({
  selector: 'app-integration-settings',
  templateUrl: './integration-settings.component.html',
  styleUrl: './integration-settings.component.scss',
})
export class IntegrationSettingsComponent {
  public routes = routes;
  public integrationForm!: FormGroup;

  public allIntegrations: Array<Integration> = [];
  public searchDataValue = '';

  // pagination variables
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
  public totalPages = 0;
  //** / pagination variables

  constructor(public router: Router, private data: DataService) {
    this.allIntegrations = this.data.allIntegrations;
  }
  ngOnInit(): void {
    this.getTableData();
    this.leaveFormInit();
  }

  private leaveFormInit(): void {
    this.integrationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      key: new FormControl('', Validators.required),
    });
  }

  private getTableData(): void {
    this.allIntegrations = [];
    this.serialNumberArray = [];

    this.data.allIntegrations.map((res: Integration, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        res.id = serialNumber;
        this.allIntegrations.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.totalData = this.data.allLeaveType.length;
    this.calculateTotalPages(this.totalData, this.pageSize);
  }
  public sortData(sort: Sort) {
    const data = this.allIntegrations.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.allIntegrations = data;
    } else {
      this.allIntegrations = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  // public searchData(value: string): void {
  //   this.dataSource.filter = value.trim().toLowerCase();
  //   this.allLeaveType = this.dataSource.filteredData;
  // }

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

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
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
}
export interface pageSelection {
  skip: number;
  limit: number;
}
