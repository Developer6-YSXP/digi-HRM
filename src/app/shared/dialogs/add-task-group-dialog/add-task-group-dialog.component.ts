import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Editor, Toolbar } from 'ngx-editor';
import { Location } from '@angular/common';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ShareProjectDialogComponent } from '../share-project-dialog/share-project-dialog.component';
import { DepartmentContent } from 'src/app/core/helpers/constants/modals.constants';
import { MatDialog } from '@angular/material/dialog';
import { BreakDialogComponent } from '../break-dialog/break-dialog.component';
import { PreviewDialogComponent } from '../preview-dialog/preview-dialog.component';

@Component({
  selector: 'app-add-task-group-dialog',
  templateUrl: './add-task-group-dialog.component.html',
  styleUrls: ['./add-task-group-dialog.component.scss'],
})
export class AddTaskGroupDialogComponent implements OnInit, OnDestroy {
  // Timer variables
  public routes = routes;
  taskForm!: FormGroup;
  private timer: any;
  private elapsedTime: number = 0; // Time in seconds
  public formattedTime: string = '00:00:00'; // HH:MM:SS format
  isRunning: boolean = false;
  editorValue: any;

  // Editor for description
  isDescription: boolean = false;
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  // Fruit autocomplete variables
  status: string[] = ['To Do', 'In Progress', 'Completed'];
  statusCtrl = new FormControl('');
  filteredStatus!: Observable<string[]>;
  // File management
  multipleFiles: File[] = [];
  fileSrc: string[] = [];
  readonly dialog = inject(MatDialog);

  @ViewChild('statusInput') statusInput!: ElementRef<HTMLInputElement>;
  private location = inject(Location);
  openActivities: boolean = false;
  isfile: boolean = false;
  showSubTask: boolean = false;

  constructor() {
    // Set up the autocomplete observable for filtering fruits
    this.filteredStatus = this.statusCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter2(value || ''))
    );
  }

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      tasks: new FormArray([this.initSubTaskForm()]),
    });
  }

  // Timer methods
  startTimer(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.timer = setInterval(() => {
      this.elapsedTime++;
      this.updateTime();
    }, 1000);
  }

  pauseTimer(): void {
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
        if (!this.isRunning) return;
        this.isRunning = false;
        clearInterval(this.timer);
      } else {
        console.log('Dialog was closed');
      }
    });
  }

  stopTimer(): void {
    this.isRunning = false;
    clearInterval(this.timer);
    this.elapsedTime = 0;
    this.updateTime();
  }

  updateTime(): void {
    const hours = Math.floor(this.elapsedTime / 3600);
    const minutes = Math.floor((this.elapsedTime % 3600) / 60);
    const seconds = this.elapsedTime % 60;

    this.formattedTime = [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':');
  }

  // Description toggle
  openDescription(): void {
    this.isDescription = !this.isDescription;
  }

  onMultipleSelect(event: any): void {
    this.multipleFiles = event.addedFiles;
    this.multipleFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.fileSrc[index] = reader.result as string;
      };
      reader.readAsDataURL(file);
    });

    this.isfile = this.fileSrc.length > 0 ? true : false;
  }

  // Check if the file is an image
  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }

  // Handle file removal
  onRemoveMultiple(file: File, event: MouseEvent): void {
    event.stopPropagation();
    const index = this.multipleFiles.indexOf(file);
    if (index >= 0) {
      this.multipleFiles.splice(index, 1);
      this.fileSrc.splice(index, 1);
    }
  }

  // Autocomplete filtering method
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.status.filter((status) =>
      status.toLowerCase().includes(filterValue)
    );
  }

  // Autocomplete selection method
  selected(event: MatAutocompleteSelectedEvent): void {
    this.statusInput.nativeElement.value = '';
    this.statusCtrl.setValue(event.option.viewValue);
  }

  close() {
    this.location.back();
  }

  openActivites(): void {
    this.openActivities = !this.openActivities;
  }

  shareAndInvite(): void {
    const dialogRef = this.dialog.open(ShareProjectDialogComponent, {
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
        console.log('Department added:', result);
      } else {
        console.log('Dialog was closed without adding a department.');
      }
    });
  }

  toggleSubTask() {
    this.showSubTask = !this.showSubTask;
  }

  previewDoc(file: string, f: File, event: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(PreviewDialogComponent, {
      width: '90vw',
      height: '90vh',

      data: {
        title: 'Preview',
        file: f,
        src: file,
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

  // Subtask
  get tasks(): FormArray {
    return this.taskForm.get('tasks') as FormArray;
  }

  initSubTaskForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      assignee: new FormControl('0'),
      dueDate: new FormControl(''),
      priority: new FormControl('0'),
    });
  }

  addSubTask(): void {
    this.tasks.push(this.initSubTaskForm());
  }

  removeTask(index: number): void {
    if (index > 0) this.tasks.removeAt(index);
  }

  getInitials(fullName: string): string {
    const names = fullName.split(' ');
    const initials = names[0].charAt(0) + (names[1] ? names[1].charAt(0) : '');
    return initials.toUpperCase();
  }

  // Cleanup on component destroy
  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.destroy();
    }
    if (this.isRunning) {
      clearInterval(this.timer);
    }
  }
}
