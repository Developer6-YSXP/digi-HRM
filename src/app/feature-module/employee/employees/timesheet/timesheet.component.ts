import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  DataService,
  apiResultFormat,
  getTimeSheet,
  routes,
} from 'src/app/core/core.index';
import { LocalConstant } from 'src/app/core/helpers/constants/local.constant';
import { ExportService } from 'src/app/core/services/export/export.service';
import { LocalService } from 'src/app/core/services/local/local.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexTooltip,
  ApexResponsive,
  ApexFill,
} from 'ng-apexcharts';

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
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;

  public chartOptionsTwo: Partial<ChartOptions>;
  public chartOptionsEight: Partial<ChartOptions>;
  public lstTimesheet: Array<getTimeSheet> = [];
  role!: number;
  selected = 'office';
  designation: string = 'manager';
  timesheetForm!: FormGroup;
  public searchDataValue = '';
  dataSource!: MatTableDataSource<getTimeSheet>;
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

  private localService = inject(LocalService);
  private exportService = inject(ExportService);

  constructor(private data: DataService) {
    this.chartOptionsTwo = {
      series: [
        {
          name: 'Timesheet',
          data: [1, 2, 3, 5, 2, 1, 6], // Counts for timesheet
        },
        {
          name: 'Hours',
          data: [8, 6, 5, 3, 6, 4, 2], // Counts for hours
        },
      ],
      chart: {
        height: 290,
        type: 'area', // Type remains area
      },
      dataLabels: {
        enabled: false, // Disable data labels
      },
      stroke: {
        curve: 'smooth', // Smooth lines for area chart
      },
      xaxis: {
        type: 'datetime', // The x-axis is a datetime
        categories: [
          '2024-10-19T00:00:00.000Z',
          '2024-10-20T01:30:00.000Z',
          '2024-10-21T02:30:00.000Z',
          '2024-10-22T03:30:00.000Z',
          '2024-10-23T04:30:00.000Z',
          '2024-10-24T05:30:00.000Z',
          '2024-10-25T06:30:00.000Z',
        ], // Time intervals for the x-axis
        labels: {
          format: 'dd MMM', // Format to display dates in a day/month/year format
        },
      },
      yaxis: {
        title: {
          text: 'Count', // Y-axis title representing counts
        },
        labels: {
          formatter: function (value: any) {
            return value.toFixed(0); // Display whole number counts
          },
        },
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm', // Tooltip format for the x-axis
        },
      },
    };

    this.chartOptionsEight = {
      series: [44, 55, 67],
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function () {
                return '249';
              },
            },
          },
        },
      },
      labels: ['Approved', 'Pending', 'Rejected'],
    };
  }

  ngOnInit(): void {
    this.getTableData();
    this.timesheetFormInit();
    this.role = this.localService.getLocalItem(LocalConstant.ROLE);
  }

  private timesheetFormInit(): void {
    this.timesheetForm = new FormGroup({
      project: new FormControl('', Validators.required),
      task: new FormControl('', Validators.required),
      deadline: new FormControl('5 May 2023', Validators.required),
      totalHours: new FormControl('40', Validators.required),
      remainingHours: new FormControl('10', Validators.required),
      date: new FormControl('', Validators.required),
      hours: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  private getTableData(): void {
    this.lstTimesheet = [];
    this.serialNumberArray = [];

    this.data.getTimeSheet().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getTimeSheet, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstTimesheet.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getTimeSheet>(this.lstTimesheet);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  public sortData(sort: Sort) {
    const data = this.lstTimesheet.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.lstTimesheet = data;
    } else {
      this.lstTimesheet = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstTimesheet = this.dataSource.filteredData;
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
    const headerTitle = [
      'Id',
      'Employee Name',
      'Date',
      'Projects',
      'Assigned Hours',
      'Hours',
      'Description',
      'Status',
    ];

    const formattedData = [
      headerTitle,
      ...this.lstTimesheet.map((item) => [
        item.id,
        item.employee,
        item.date,
        item.project,
        item.assignedhours,
        item.hrs,
        item.description,
        item.status,
      ]),
    ];
    this.exportService.exportToExcel(
      formattedData,
      headerTitle,
      'exportTimesheetRecord.xlsx'
    );
  }

  exportToPdf(): void {
    if (!this.lstTimesheet || this.lstTimesheet.length === 0) {
      console.error('No timesheet data available to export.');
      return;
    }

    // Incoming headers and their mapped titles
    const headerMapping: { [key: string]: string } = {
      id: 'Id',
      employee: 'Employee Name',
      date: 'Date',
      project: 'Projects',
      assignedhours: 'Assigned Hours',
      hrs: 'Hours',
      description: 'Description',
      status: 'Status',
    };

    const headerTitles = Object.values(headerMapping); // Get the desired titles from the mapping

    // Ensure every item contains all the required fields
    const tableData = this.lstTimesheet.map((item: any) =>
      headerTitles.map((title) => {
        const key = Object.keys(headerMapping).find(
          (k) => headerMapping[k] === title
        );
        return {
          text: key && item[key] !== undefined ? item[key].toString() : '',
          style: 'tableCell',
        };
      })
    );

    const documentDefinition = {
      content: [
        { text: 'Timesheet Record', style: 'header' },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: [
              headerTitles.map((title) => ({
                text: title,
                style: 'tableHeader',
              })),
              ...tableData,
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          fontSize: 10,
          bold: true,
          fillColor: '#f0f0f0',
        },
        tableCell: {
          fontSize: 8,
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
      },
    };
    this.exportService.exportToPdf(
      documentDefinition,
      'exportTimesheetRecord.pdf'
    );
  }
}
export interface pageSelection {
  skip: number;
  limit: number;
}
