import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-attendance-employee',
  templateUrl: './attendance-employee.component.html',
  styleUrls: ['./attendance-employee.component.scss'],
  providers: [DatePipe],
})
export class AttendanceEmployeeComponent implements OnInit {
  public routes = routes;
  selected1 = 'option1';
  selected2 = 'option1';
  date: Date = new Date();
  dayOfWeek: string | null;
  formattedDate!: string;
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
  isClockedIn: boolean = false;
  startTime: number = 0;
  breakStartTime: number = 0;
  breakSeconds: number = 0;
  overtimeSeconds: number = 0;
  punchInDate: Date | null = null;

  constructor(private datePipe: DatePipe) {
    // Initialize `dayOfWeek` using the `DatePipe` to format the day of the week
    this.dayOfWeek = this.datePipe.transform(this.date, 'EEE');
  }

  ngOnInit(): void {
    // Initialize `formattedDate` when the component initializes
    this.restoreTimerState();
  }

  // formatDate(date: Date): string {
  //   // Get day of the month as a number and ensure it's treated as an integer
  //   const day = parseInt(this.datePipe.transform(date, 'd') || '0', 10);
  //   const month = this.datePipe.transform(date, 'MMM'); // Get abbreviated month
  //   const year = this.datePipe.transform(date, 'yyyy'); // Get year
  //   const time = this.datePipe.transform(date, 'hh:mm a'); // Get time in 12-hour format

  //   // Add ordinal suffix to day
  //   const ordinal = (day: number) => {
  //     if (day > 3 && day < 21) return 'th'; // special case for 11th, 12th, 13th
  //     switch (day % 10) {
  //       case 1:
  //         return 'st';
  //       case 2:
  //         return 'nd';
  //       case 3:
  //         return 'rd';
  //       default:
  //         return 'th';
  //     }
  //   };

  //   // Construct formatted date string
  //   return `${day}${ordinal(day)} ${month} ${year} ${time}`;
  // }

  clockIn() {
    if (!this.isClockedIn) {
      this.isClockedIn = true;
      this.startTime = Date.now();
      this.punchInDate = new Date(this.startTime); // Store the punch-in date
      this.saveTimerState();
      this.startTimer();
    }
  }

  takeBreak() {
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
      punchInDate: this.punchInDate ? this.punchInDate.toISOString() : null, // Store date as ISO string
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
      this.punchInDate = parsedState.punchInDate
        ? new Date(parsedState.punchInDate)
        : null; // Restore punch-in date

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
      this.punchInDate = null;

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

  formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
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
