import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DepartmentContent } from 'src/app/core/helpers/constants/modals.constants';
import { routes } from 'src/app/core/helpers/routes/routes';
import { DataService } from 'src/app/core/services/data/data.service';
import {
  allroles,
  apiResultFormat,
  getDepartment,
  getTimeSheet,
  members,
} from 'src/app/core/services/interface/models';
import { AddDepartmentDialogComponent } from 'src/app/shared/dialogs/add-department-dialog/add-department-dialog.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss',
})
export class DepartmentsComponent {
  readonly dialog = inject(MatDialog);
  departmentForm!: FormGroup;
  public lstDepartment: Array<getDepartment> = [];
  public searchDataValue = '';
  dataSource!: MatTableDataSource<getDepartment>;
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
  public lstTimesheet: Array<getTimeSheet> = [];
  //** / pagination variables

  public allroles: Array<allroles>;
  member!: members[];
  constructor(public router: Router, private data: DataService) {
    this.allroles = this.data.allroles;
  }

  ngOnInit(): void {
    this.getTableData();
    this.departmentFormInit();
  }

  private departmentFormInit(): void {
    this.departmentForm = new FormGroup({
      name: new FormControl(''),
    });
  }

  private getTableData(): void {
    this.lstDepartment = [];
    this.serialNumberArray = [];

    this.data.getDepartment().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getDepartment, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstDepartment.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getDepartment>(
        this.lstDepartment
      );
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  public sortData(sort: Sort) {
    const data = this.lstDepartment.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.lstDepartment = data;
    } else {
      this.lstDepartment = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstDepartment = this.dataSource.filteredData;
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

  viewTeamMember(member: getDepartment) {
    this.member = member.members;
  }

  addDepartment(): void {
    const dialogRef = this.dialog.open(AddDepartmentDialogComponent, {
      width: '400px',
      data: {
        isDepartment: true,
        title: DepartmentContent.ADD_DEPARTMENT,
        fieldName: DepartmentContent.DEPARTMENT_NAME,
        fieldType: DepartmentContent.TEXT_TYPE,
        submitBtn: DepartmentContent.SUBMIT,
        closeBtn: DepartmentContent.CLOSE,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Department added:', result);
      } else {
        console.log('Dialog was closed without adding a department.');
      }
    });
  }

  editDepartment(item: getDepartment): void {
    const dialogRef = this.dialog.open(AddDepartmentDialogComponent, {
      width: '400px',
      data: {
        isDepartment: true,
        title: DepartmentContent.EDIT_DEPARTMENT,
        fieldName: DepartmentContent.DEPARTMENT_NAME,
        fieldType: DepartmentContent.TEXT_TYPE,
        submitBtn: DepartmentContent.SUBMIT,
        closeBtn: DepartmentContent.CLOSE,
        departmentData: item,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Department added:', result);
      } else {
        console.log('Dialog was closed without adding a department.');
      }
    });
  }

  addTeamMember(): void {
    const dialogRef = this.dialog.open(AddDepartmentDialogComponent, {
      width: '400px',
      data: {
        isDepartment: false,
        title: DepartmentContent.ADD_TEAM_MEMBER,
        selectField: DepartmentContent.DEPARTMENT_NAME,
        fieldName: DepartmentContent.MEMBER_NAME,
        fieldType: DepartmentContent.TEXT_TYPE,
        submitBtn: DepartmentContent.SUBMIT,
        closeBtn: DepartmentContent.CLOSE,
        departments: this.lstDepartment,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Department added:', result);
      } else {
        console.log('Dialog was closed without adding a department.');
      }
    });
  }
}

export interface pageSelection {
  skip: number;
  limit: number;
}
