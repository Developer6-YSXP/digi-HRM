import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DepartmentContent } from 'src/app/core/helpers/constants/modals.constants';
import { AddTaskGroupDialogComponent } from 'src/app/shared/dialogs/add-task-group-dialog/add-task-group-dialog.component';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {
  createEventId,
  INITIAL_EVENTS,
} from 'src/app/feature-module/main/apps/calendar/event-utils';
import { AddTaskDialogComponent } from 'src/app/shared/dialogs/add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  options = [
    { label: 'Board', icon: 'fas fa-columns', link: '#board' },
    { label: 'List', icon: 'fas fa-list-ul', link: '#list' },
    { label: 'Calendar', icon: 'far fa-calendar', link: '#calendar' },
    // { label: 'Table', icon: 'fas fa-table', link: '#table' },
    // { label: 'Filter', icon: 'fas fa-filter', link: '#filter' },
  ];

  currentEvents: EventApi[] = [];

  selectedOption = this.options[0]; // Default selection
  showGroup: boolean = false;
  groupForm!: FormGroup;
  statusName!: string;
  color!: string;
  backgroundColor!: string;
  isHovered: { [key: number]: number | null } = {};
  projectName: string = 'Hospital Admin';
  private router = inject(Router);
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  constructor(private changeDetector: ChangeDetectorRef) {}
  selectOption(option: any) {
    this.selectedOption = option;
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
    this.isHovered = {};
    this.initGroupForm();
    this.initializeDefaultGroups(); // Initialize default groups on load
  }

  initGroupForm(): void {
    this.groupForm = new FormGroup({
      groups: new FormArray([]), // Start with an empty group array
    });
  }

  get groups() {
    return this.groupForm.get('groups') as FormArray;
  }

  createGroup(
    statusName: string,
    color: string,
    backgroundColor: string
  ): FormGroup {
    return new FormGroup({
      statusName: new FormControl(statusName),
      color: new FormControl(color),
      background: new FormControl(backgroundColor),
      tasks: new FormArray([]),
    });
  }

  getTasks(groupIndex: number) {
    return this.groups.at(groupIndex).get('tasks') as FormArray;
  }

  createTask(): FormGroup {
    return new FormGroup({
      taskName: new FormControl('Default Task Name'), // Default name for the task
      taskPriority: new FormControl('0'), // Default priority
      dueDate: new FormControl(''),
      followers: new FormControl('0'),
      status: new FormControl(''), // Default status
    });
  }

  toggleShowGroup() {
    this.color = '';
    this.statusName = '';
    this.showGroup = !this.showGroup;
  }

  generateGroup() {
    this.getLightenedColor(this.color);
    console.log(this.color, this.statusName, this.backgroundColor);
    // Push a new group with the color and statusName parameters
    this.groups.push(
      this.createGroup(this.statusName, this.color, this.backgroundColor)
    );

    this.showGroup = !this.showGroup;
  }

  lightenColor(hex: string, percent: number): string {
    hex = hex.replace(/^#/, '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const newR = Math.min(255, Math.floor(r + (255 - r) * percent))
      .toString(16)
      .padStart(2, '0');
    const newG = Math.min(255, Math.floor(g + (255 - g) * percent))
      .toString(16)
      .padStart(2, '0');
    const newB = Math.min(255, Math.floor(b + (255 - b) * percent))
      .toString(16)
      .padStart(2, '0');

    return `#${newR}${newG}${newB}`;
  }

  getLightenedColor(color: string): void {
    this.backgroundColor = this.lightenColor(color, 0.9); // Adjust the percentage as needed
  }

  addTask(groupIndex: number) {
    this.getTasks(groupIndex).push(this.createTask());
  }

  removeTask(groupIndex: number, taskIndex: number) {
    this.getTasks(groupIndex).removeAt(taskIndex);
  }

  removeGroup(index: number) {
    this.groups.removeAt(index);
  }

  openTaskView() {
    const dialogRef = this.dialog.open(AddTaskGroupDialogComponent, {
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

  dropTask(event: CdkDragDrop<any[]>, groupIndex: number) {
    if (event.previousContainer === event.container) {
      // Rearranging within the same list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Moving between lists
      transferArrayItem(
        event.previousContainer.data,

        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  viewTaskSummary() {
    this.router.navigate([`/projects/task-description`]);
  }

  onSubmit() {}

  // Initialize default groups with pre-set status names and colors
  initializeDefaultGroups() {
    const defaultGroups = [
      {
        statusName: 'To Do',
        color: '#a2a4a7',
        backgroundColor: '#f3f3f5',
        defaultTask: {
          taskName: 'Default To Do Task',
          taskPriority: '0',
          dueDate: '09/10/2024',
          followers: '0',
          status: 'To Do',
        },
      },
      {
        statusName: 'In Progress',
        color: '#1E90FF',
        backgroundColor: '#e0f0ff',
      },
      {
        statusName: 'Completed',
        color: '#32CD32',
        backgroundColor: '#e0ffe0',
      },
    ];

    defaultGroups.forEach((group, index) => {
      const groupForm = this.createGroup(
        group.statusName,
        group.color,
        group.backgroundColor
      );
      if (group.defaultTask && group.statusName === 'To Do') {
        (groupForm.get('tasks') as FormArray).push(
          new FormGroup({
            taskName: new FormControl(group.defaultTask.taskName),
            taskPriority: new FormControl(group.defaultTask.taskPriority),
            dueDate: new FormControl(group.defaultTask.dueDate),
            followers: new FormControl(group.defaultTask.followers),
            status: new FormControl(group.defaultTask.status),
          })
        );
      }
      this.groups.push(groupForm);
    });
  }

  openTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '500px',
      data: {
        title: 'Add Task',
        submitBtn: DepartmentContent.SUBMIT,
        closeBtn: DepartmentContent.CLOSE,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog was closed');
      }
    });
  }
}
