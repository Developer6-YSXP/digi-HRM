import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  DataService,
  apiResultFormat,
  getInterview,
  routes,
} from 'src/app/core/core.index';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-interview-questions',
  templateUrl: './interview-questions.component.html',
  styleUrls: ['./interview-questions.component.scss'],
})
export class InterviewQuestionsComponent implements OnInit {
  public interviewForm!: FormGroup;
  public categoryForm!: FormGroup;
  public lstInterview: Array<getInterview> = [];
  public searchDataValue = '';
  dataSource!: MatTableDataSource<getInterview>;
  public routes = routes;
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
    this.interviewFormInit();
    this.categporyFormInit();
  }

  private interviewFormInit(): void {
    this.interviewForm = new FormGroup({
      AddQuestion: new FormControl('', Validators.required),
      OptionA: new FormControl('', Validators.required),
      OptionB: new FormControl('', Validators.required),
      OptionC: new FormControl('', Validators.required),
      OptionD: new FormControl('', Validators.required),
      Correctanswer: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required),
      videoLink: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }

  private categporyFormInit(): void {
    this.categoryForm = new FormGroup({
      category: new FormControl(''),
    });
  }

  private getTableData(): void {
    this.lstInterview = [];
    this.serialNumberArray = [];

    this.data.getInterview().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getInterview, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstInterview.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getInterview>(this.lstInterview);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  public sortData(sort: Sort) {
    const data = this.lstInterview.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.lstInterview = data;
    } else {
      this.lstInterview = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstInterview = this.dataSource.filteredData;
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
