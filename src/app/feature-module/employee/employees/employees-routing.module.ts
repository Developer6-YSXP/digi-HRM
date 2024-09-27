import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './all-employee/employee-list/employee-list.component';
import { EmployeePageContentComponent } from './all-employee/employee-page-content/employee-page-content.component';
import { EmployeeProfileComponent } from './all-employee/employee-profile/employee-profile.component';
import { AttendanceAdminComponent } from './attendance-admin/attendance-admin.component';
import { AttendanceEmployeeComponent } from './attendance-employee/attendance-employee.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DesignationsComponent } from './designations/designations.component';
import { EmployeesComponent } from './employees.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { LeaveAdminComponent } from './leave-admin/leave-admin.component';
import { LeaveEmployeeComponent } from './leave-employee/leave-employee.component';
import { LeaveSettingsComponent } from './leave-settings/leave-settings.component';
import { OvertimeComponent } from './overtime/overtime.component';
import { ShiftListComponent } from './shift-list/shift-list.component';
import { ShiftScheduleComponent } from './shift-schedule/shift-schedule.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { PermissionsComponent } from '../permissions/permissions.component';
import { GeneralSettingsComponent } from '../settings/general-settings/general-settings.component';
import { NotificationSettingsComponent } from '../settings/notification-settings/notification-settings.component';
import { IntegrationSettingsComponent } from '../settings/integration-settings/integration-settings.component';
import { ProfileSettingsComponent } from '../settings/profile-settings/profile-settings.component';
import { FeedbackComponent } from '../feedback/feedback.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    children: [
      { path: 'employee-list', component: EmployeeListComponent },
      { path: 'employee-page', component: EmployeePageContentComponent },
      { path: 'employee-profile', component: EmployeeProfileComponent },
      { path: 'holidays', component: HolidaysComponent },
      { path: 'leave-admin', component: LeaveAdminComponent },
      { path: 'leave-employee', component: LeaveEmployeeComponent },
      { path: 'leave-settings', component: LeaveSettingsComponent },
      { path: 'attendance-admin', component: AttendanceAdminComponent },
      { path: 'attendance-employee', component: AttendanceEmployeeComponent },
      { path: 'departments', component: DepartmentsComponent },
      { path: 'designations', component: DesignationsComponent },
      { path: 'timesheet', component: TimesheetComponent },
      { path: 'overtime', component: OvertimeComponent },
      { path: 'shift-schedule', component: ShiftScheduleComponent },
      { path: 'shift-list', component: ShiftListComponent },
      { path: 'permissions', component: PermissionsComponent },
      { path: 'general-setting', component: GeneralSettingsComponent },
      {
        path: 'notification-setting',
        component: NotificationSettingsComponent,
      },
      { path: 'integration-setting', component: IntegrationSettingsComponent },
      { path: 'profile-setting', component: ProfileSettingsComponent },
      { path: 'feedback', component: FeedbackComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
