import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';
import {
  DataService,
  apiResultFormat,
  getLeave,
  routes,
} from 'src/app/core/core.index';
import { LeaveContent } from 'src/app/core/helpers/constants/modals.constants';
import { ExportService } from 'src/app/core/services/export/export.service';
import { LeaveDialogComponent } from 'src/app/shared/dialogs/leave-dialog/leave-dialog.component';
import { Chart } from 'node_modules/chart.js';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  dataLabels: ApexDataLabels | any;
  grid: ApexGrid | any;
  stroke: ApexStroke | any;
  title: ApexTitleSubtitle | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  legend: ApexLegend | any;
  tooltip: ApexTooltip | any;
  responsive: ApexResponsive[] | any;
  fill: ApexFill | any;
  labels: string[] | any;
};

@Component({
  selector: 'app-leave-employee',
  templateUrl: './leave-employee.component.html',
  styleUrls: ['./leave-employee.component.scss'],
})
export class LeaveEmployeeComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  public lstLeave: Array<getLeave> = [];
  public searchDataValue = '';
  dataSource!: MatTableDataSource<getLeave>;
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

  private exportService = inject(ExportService);

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.gradchart();
    this.doughcharts();
    this.getTableData();
  }

  gradchart() {
    new Chart('piecharts', {
      type: 'bar',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sept',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'Leaves',
            data: [0, 1, 2, 0, 0, 1],
            backgroundColor: ['#44c4fa'],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
          },
        },
      },
    });
  }

  doughcharts() {
    new Chart('doughcharts', {
      type: 'doughnut',
      data: {
        labels: [
          'Annual Leaves',
          'Medical Leaves',
          'Paid Leaves',
          'Remaining Leaves',
        ],
        datasets: [
          {
            data: [12, 4, 6, 5],
            backgroundColor: ['#664dc9', '#44c4fa', '#38cb89', '#3e80eb'],
            borderWidth: 1,
          },
        ],
      },
    });
  }

  addLeave(): void {
    const dialogRef = this.dialog.open(LeaveDialogComponent, {
      width: '500px',
      data: {
        title: LeaveContent.ADD_LEAVE,
        submitBtn: LeaveContent.SUBMIT,
        closeBtn: LeaveContent.CLOSE,
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

  editLeave(): void {
    const dialogRef = this.dialog.open(LeaveDialogComponent, {
      width: '500px',
      data: {
        title: LeaveContent.EDIT_LEAVE,
        submitBtn: LeaveContent.SUBMIT,
        closeBtn: LeaveContent.CLOSE,
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

  private getTableData(): void {
    this.lstLeave = [];
    this.serialNumberArray = [];

    this.data.getLeave().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getLeave, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstLeave.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getLeave>(this.lstLeave);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  public sortData(sort: Sort) {
    const data = this.lstLeave.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.lstLeave = data;
    } else {
      this.lstLeave = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstLeave = this.dataSource.filteredData;
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

  exportToExcel(): void {
    this.exportService.exportToExcel(this.lstLeave, 'export.xlsx');
  }

  exportToPdf(): void {
    this.exportService.exportToPdf(this.lstLeave, 'export.pdf');
  }
}
export interface pageSelection {
  skip: number;
  limit: number;
}
