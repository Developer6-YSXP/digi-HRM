import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from 'src/app/core/core.index';

@Component({
  selector: 'app-reporting-analytics',
  templateUrl: './reporting-analytics.component.html',
  styleUrl: './reporting-analytics.component.scss'
})
export class ReportingAnalyticsComponent {
  public routes = routes;

 
dashboardMetrics = {
  timeToHire: '15 Days',
  completionRate: '85%',
  feedbackScore: '4.7/5',
};

 
reports = [
  { reportName: 'Onboarding Summary', date: '2024-09-30', status: 'Completed' },
  { reportName: 'Time-to-Hire Analysis', date: '2024-09-28', status: 'Scheduled' },
  { reportName: 'Completion Rate Overview', date: '2024-09-25', status: 'Completed' },
];

 
reportType: string = '';
scheduleDate: string = '';

constructor() {}

ngOnInit(): void {}

 
generateReport() {
  if (this.reportType) {
    this.reports.push({
      reportName: this.reportType,
      date: new Date().toISOString().split('T')[0],
      status: 'Completed',
    });
    this.reportType = '';  
  } else {
    alert('Please select a report type.');
  }
}

 
exportData() {
  alert('Data exported as CSV!');
}

 
scheduleReport() {
  if (this.reportType && this.scheduleDate) {
    this.reports.push({
      reportName: this.reportType,
      date: this.scheduleDate,
      status: 'Scheduled',
    });
    this.reportType = '';
    this.scheduleDate = '';
  } else {
    alert('Please provide report type and schedule date.');
  }
}
}
