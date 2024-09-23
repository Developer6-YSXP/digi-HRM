import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { routes } from 'src/app/core/core.index';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexXAxis,
  ApexResponsive,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';
import { LocalConstant } from 'src/app/core/helpers/constants/local.constant';
import { LocalService } from 'src/app/core/services/local/local.service';
import { DepartmentContent } from 'src/app/core/helpers/constants/modals.constants';
import { BreakDialogComponent } from 'src/app/shared/dialogs/break-dialog/break-dialog.component';
import { MatDialog } from '@angular/material/dialog';
export type ChartOptions = {
  series: ApexAxisChartSeries | any;

  chart: ApexChart | any;

  responsive: ApexResponsive | any;

  colors: any;

  dataLabels: ApexDataLabels | any;

  plotOptions: ApexPlotOptions | any;

  yaxis: ApexYAxis | any;

  xaxis: ApexXAxis | any;

  legend: ApexLegend | any;

  fill: ApexFill | any;
};

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnInit {
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  breakHours: number = 0;
  breakMinutes: number = 0;
  overtimeHours: number = 0;
  overtimeMinutes: number = 0;
  remainingHours: number = 9;
  remainingMinutes: number = 0;
  timer: any;
  breakTimer: any;
  totalWorkSeconds: number = 0;
  currentDate = new Date();
  isClockedIn: boolean = false;
  startTime: number = 0;
  breakStartTime: number = 0;
  breakSeconds: number = 0;
  overtimeSeconds: number = 0;
  public routes = routes;
  private localService = inject(LocalService);
  readonly dialog = inject(MatDialog);
  public projectSliderOptions: OwlOptions = {
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    smartSpeed: 2000,
    autoplay: false,
    navText: [
      '<i class="fa-solid fa-chevron-left"></i>',
      '<i class="fa-solid fa-chevron-right"></i>',
    ],

    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 3,
      },
      1400: {
        items: 1,
      },
    },
  };
  public companySliderOptions: OwlOptions = {
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    smartSpeed: 2000,
    autoplay: false,
    navText: [
      '<i class="fa-solid fa-chevron-left"></i>',
      '<i class="fa-solid fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 2,
      },
      992: {
        items: 2,
      },
      1200: {
        items: 3,
      },
      1400: {
        items: 4,
      },
    },
  };
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  role!: number;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Break',
          data: [-50, -120, -80, -180, -80, -70, -100],
        },
        {
          name: 'Hours',
          data: [200, 250, 200, 290, 220, 300, 250],
        },
      ],
      colors: ['#FC133D', '#55CE63'],

      chart: {
        type: 'bar',
        height: 210,
        stacked: true,

        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 280,
          options: {
            legend: {
              position: 'bottom',
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 4,
          borderRadiusApplication: 'end', // "around" / "end"
          borderRadiusWhenStacked: 'all', // "all"/"last"
          columnWidth: '20%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      // stroke: {
      //     width: 5,
      //     colors: ['#fff']
      //   },
      yaxis: {
        min: -200,
        max: 300,
        tickAmount: 5,
      },
      xaxis: {
        categories: [
          ' Jan ',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
        ],
      },
      legend: { show: false },
      fill: {
        opacity: 1,
      },
    };
  }
  ngOnInit(): void {
    this.restoreTimerState();
    this.role = this.localService.getLocalItem(LocalConstant.ROLE);
  }
  clockIn() {
    if (!this.isClockedIn) {
      this.isClockedIn = true;
      this.startTime = Date.now();
      this.saveTimerState();
      this.startTimer();
    }
  }

  takeBreak() {
    const dialogRef = this.dialog.open(BreakDialogComponent, {
      width: '500px',
      data: {
        title: 'Share this task',
        subTitle: `Sharing ${'task 2'} task`,
        submitBtn: DepartmentContent.SUBMIT,
        closeBtn: DepartmentContent.CLOSE,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.isClockedIn && !this.breakTimer) {
          // Check if a break is not already active
          this.breakStartTime = Date.now();
          this.saveTimerState();
          this.breakTimer = setInterval(() => {
            this.breakSeconds++;
            if (this.breakSeconds === 60) {
              this.breakSeconds = 0;
              this.breakMinutes++;
              if (this.breakMinutes === 60) {
                this.breakMinutes = 0;
                this.breakHours++;
              }
            }
            this.saveTimerState();
          }, 1000); // Update break time every second
        }
      } else {
        console.log('Dialog was closed');
      }
    });
  }

  startTimer() {
    this.timer = setInterval(() => {
      const now = Date.now();
      const elapsedTime = now - this.startTime;

      this.totalWorkSeconds = Math.floor(elapsedTime / 1000);

      // Update work time display
      this.seconds = Math.floor(this.totalWorkSeconds % 60);
      this.minutes = Math.floor((this.totalWorkSeconds / 60) % 60);
      this.hours = Math.floor(this.totalWorkSeconds / 3600);

      // Calculate remaining time
      const totalMinutesWorked = this.hours * 60 + this.minutes;
      const totalMinutesRemaining = 9 * 60 - totalMinutesWorked;
      this.remainingHours = Math.max(Math.floor(totalMinutesRemaining / 60), 0);
      this.remainingMinutes = Math.max(totalMinutesRemaining % 60, 0);

      // Calculate overtime
      const totalSecondsWorkedIncludingBreaks =
        this.totalWorkSeconds -
        (this.breakHours * 3600 + this.breakMinutes * 60 + this.breakSeconds);
      const totalSecondsOvertime = Math.max(
        totalSecondsWorkedIncludingBreaks - 9 * 3600,
        0
      );
      this.overtimeHours = Math.floor(totalSecondsOvertime / 3600);
      this.overtimeMinutes = Math.floor((totalSecondsOvertime % 3600) / 60);
      this.overtimeSeconds = totalSecondsOvertime % 60;

      // Save timer state to localStorage
      this.saveTimerState();
    }, 1000);
  }

  saveTimerState() {
    const state = {
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
      breakHours: this.breakHours,
      breakMinutes: this.breakMinutes,
      breakSeconds: this.breakSeconds,
      overtimeHours: this.overtimeHours,
      overtimeMinutes: this.overtimeMinutes,
      overtimeSeconds: this.overtimeSeconds,
      remainingHours: this.remainingHours,
      remainingMinutes: this.remainingMinutes,
      totalWorkSeconds: this.totalWorkSeconds,
      startTime: this.startTime,
      breakStartTime: this.breakStartTime,
      isClockedIn: this.isClockedIn,
    };
    localStorage.setItem('timerState', JSON.stringify(state));
  }

  restoreTimerState() {
    const state = localStorage.getItem('timerState');
    if (state) {
      const parsedState = JSON.parse(state);
      this.hours = parsedState.hours || 0;
      this.minutes = parsedState.minutes || 0;
      this.seconds = parsedState.seconds || 0;
      this.breakHours = parsedState.breakHours || 0;
      this.breakMinutes = parsedState.breakMinutes || 0;
      this.breakSeconds = parsedState.breakSeconds || 0;
      this.overtimeHours = parsedState.overtimeHours || 0;
      this.overtimeMinutes = parsedState.overtimeMinutes || 0;
      this.overtimeSeconds = parsedState.overtimeSeconds || 0;
      this.remainingHours = parsedState.remainingHours || 9;
      this.remainingMinutes = parsedState.remainingMinutes || 0;
      this.totalWorkSeconds = parsedState.totalWorkSeconds || 0;
      this.startTime = parsedState.startTime || Date.now();
      this.breakStartTime = parsedState.breakStartTime || 0;
      this.isClockedIn = parsedState.isClockedIn || false;

      if (this.isClockedIn) {
        this.startTimer();
      }
    }
  }

  stopTimer() {
    if (this.isClockedIn) {
      clearInterval(this.timer);
      if (this.breakTimer) {
        clearInterval(this.breakTimer);
        this.breakTimer = null; // Reset break timer reference
      }

      // Reset timer values to zero
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      this.breakHours = 0;
      this.breakMinutes = 0;
      this.breakSeconds = 0;
      this.overtimeHours = 0;
      this.overtimeMinutes = 0;
      this.overtimeSeconds = 0;
      this.remainingHours = 9;
      this.remainingMinutes = 0;
      this.totalWorkSeconds = 0;
      this.isClockedIn = false;

      // Clear stored state
      localStorage.removeItem('timerState');
    }
  }

  stopBreak() {
    if (this.breakTimer) {
      clearInterval(this.breakTimer);
      this.breakTimer = null; // Reset break timer reference
    }

    // Save the current break time state
    this.saveTimerState();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.breakTimer) {
      clearInterval(this.breakTimer);
    }
    this.saveTimerState();
  }
}
