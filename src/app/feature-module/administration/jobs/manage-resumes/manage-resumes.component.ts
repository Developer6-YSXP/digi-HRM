import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  DataService,
  apiResultFormat,
  getManageResume,
  routes,
} from 'src/app/core/core.index';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-manage-resumes',
  templateUrl: './manage-resumes.component.html',
  styleUrls: ['./manage-resumes.component.scss'],
})
export class ManageResumesComponent implements OnInit {
  public routes = routes;
  public editCandidateForm!: FormGroup;
  public lstManage: Array<getManageResume> = [];
  public searchDataValue = '';
  dataSource!: MatTableDataSource<getManageResume>;

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

  constructor(private formBuilder: FormBuilder, private data: DataService) {}

  ngOnInit(): void {
    this.getTableData();
    this.formInit();
  }

  private formInit(): void {
    this.editCandidateForm = new FormGroup({
      JobName: new FormControl('', Validators.required),
      Department: new FormControl('', Validators.required),
      JobType: new FormControl('', Validators.required),
      Status: new FormControl('', Validators.required),
      Startdate: new FormControl('', Validators.required),
      Expiredate: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      vacancies: new FormControl('', Validators.required),
      experience: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      salaryFrom: new FormControl('', Validators.required),
      salaryTo: new FormControl('', Validators.required),
      jobType: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  private getTableData(): void {
    this.lstManage = [];
    this.serialNumberArray = [];

    this.data.getManageResume().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getManageResume, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstManage.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getManageResume>(this.lstManage);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  public sortData(sort: Sort) {
    const data = this.lstManage.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.lstManage = data;
    } else {
      this.lstManage = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstManage = this.dataSource.filteredData;
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
