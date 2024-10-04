import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from 'src/app/core/core.index';

@Component({
  selector: 'app-onboarding-checklist-management',
  templateUrl: './onboarding-checklist-management.component.html',
  styleUrl: './onboarding-checklist-management.component.scss'
})
export class OnboardingChecklistManagementComponent {
  public routes = routes;
 // Array to hold checklist data
 checklists: {
  checklistName: string;
  taskDescription: string;
  assignedTo: string;
  dueDate: string;
  reminderEnabled: boolean;
  status: string;
}[] = [];

// Form data model
checklistName: string = '';
taskDescription: string = '';
assignedTo: string = '';
dueDate: string = '';
reminderEnabled: boolean = false;
status: string = 'Pending';

constructor() {}

ngOnInit(): void {
  
  this.checklists = [
    {
      checklistName: 'New Hire Onboarding',
      taskDescription: 'Complete employment forms',
      assignedTo: 'HR Admin',
      dueDate: '2024-10-10',
      reminderEnabled: true,
      status: 'Pending',
    },
    {
      checklistName: 'Benefits Setup',
      taskDescription: 'Enroll in health insurance',
      assignedTo: 'New Hire',
      dueDate: '2024-10-12',
      reminderEnabled: true,
      status: 'Pending',
    },
    {
      checklistName: 'IT Setup',
      taskDescription: 'Configure company laptop and software access',
      assignedTo: 'IT Admin',
      dueDate: '2024-10-08',
      reminderEnabled: false,
      status: 'Completed',
    },
  ];
}

// Function to add a new checklist
addChecklist() {
  this.checklists.push({
    checklistName: this.checklistName,
    taskDescription: this.taskDescription,
    assignedTo: this.assignedTo,
    dueDate: this.dueDate,
    reminderEnabled: this.reminderEnabled,
    status: this.status,
  });

 
  this.checklistName = '';
  this.taskDescription = '';
  this.assignedTo = '';
  this.dueDate = '';
  this.reminderEnabled = false;
}

// Function to mark a task as completed
markAsCompleted(index: number) {
  this.checklists[index].status = 'Completed';
}

// Function to delete a checklist
deleteChecklist(index: number) {
  this.checklists.splice(index, 1);
}
}
