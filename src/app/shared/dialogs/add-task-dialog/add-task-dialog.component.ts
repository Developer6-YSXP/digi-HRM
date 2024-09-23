import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddTask } from 'src/app/core/services/interface/models';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss',
})
export class AddTaskDialogComponent {
  isDescription: boolean = false;

  editorValue: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddTask,
    public dialogRef: MatDialogRef<AddTaskDialogComponent>
  ) {}

  // Description toggle
  openDescription(): void {
    this.isDescription = !this.isDescription;
  }

  close(): void {
    this.dialogRef.close();
  }
}
