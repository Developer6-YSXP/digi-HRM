import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';
 
interface Task {
  task: string;
  assignee: string;
  dueDate: string;
  status: string;
}
@Component({
  selector: 'app-task-automation',
  templateUrl: './task-automation.component.html',
  styleUrl: './task-automation.component.scss'
})
export class TaskAutomationComponent {
  public routes = routes;
  
 tasks: Task[] = [
  { task: 'Collect employee documents', assignee: 'HR Manager', dueDate: '2024-10-10', status: 'Pending' },
  { task: 'Schedule orientation', assignee: 'HR Coordinator', dueDate: '2024-10-08', status: 'Completed' },
  { task: 'Submit payroll details', assignee: 'Payroll Admin', dueDate: '2024-10-05', status: 'Overdue' },
];

 
reportData = {
  totalTasks: 10,
  completedTasks: 7,
  overdueTasks: 2,
  bottlenecks: 'Payroll Admin delayed payroll submissions',
};

 
sendReminder(task: Task) {
  alert(`Reminder sent to ${task.assignee} for task: ${task.task}`);
}


escalateTask(task: Task) {
  if (task.status === 'Overdue') {
    alert(`Task ${task.task} escalated to upper management!`);
  } else {
    alert(`Task ${task.task} is not overdue yet.`);
  }
}

constructor() {}

ngOnInit(): void {}
}
