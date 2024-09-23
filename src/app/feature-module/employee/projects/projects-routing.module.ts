import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectContentComponent } from './project-content/project-content.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectsComponent } from './projects.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddTaskGroupDialogComponent } from 'src/app/shared/dialogs/add-task-group-dialog/add-task-group-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    children: [
      {
        path: 'project-page',
        component: ProjectContentComponent,
        data: { breadcrumb: 'Project-page' },
      },
      {
        path: 'project-list',
        component: ProjectListComponent,
        data: { breadcrumb: 'Project-list' },
      },
      {
        path: 'project-view',
        component: ProjectViewComponent,
        data: { breadcrumb: 'Project-page' },
      },
      {
        path: 'task-board',
        component: TaskBoardComponent,
        data: { breadcrumb: 'Task-board' },
      },
      {
        path: 'tasks',
        component: TasksComponent,
        data: { breadcrumb: 'Tasks' },
      },
      {
        path: 'task-description',
        component: AddTaskGroupDialogComponent,
        data: { breadcrumb: 'Task-description' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
