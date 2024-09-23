import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  Renderer2,
} from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShareProject } from 'src/app/core/core.index';
import { datasModel } from 'src/app/feature-module/account/account-list/account-list.component';

@Component({
  selector: 'app-share-project-dialog',
  templateUrl: './share-project-dialog.component.html',
  styleUrl: './share-project-dialog.component.scss',
})
export class ShareProjectDialogComponent {
  departmentName!: string;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  data1: datasModel[] = [];
  addOnBlur = true;
  changeAccessType: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ShareProject,
    public dialogRef: MatDialogRef<ShareProjectDialogComponent>,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('input', ['$event.target'])
  onInput(input: HTMLInputElement): void {
    this.resize();
  }

  ngOnInit(): void {
    this.resize();
  }

  resize() {
    const element = this.el.nativeElement;
    this.renderer.setStyle(element, 'height', 'auto');
    this.renderer.setStyle(element, 'height', element.scrollHeight + 'px');
  }

  trackByFn(index: number, item: datasModel) {
    return item.name;
  }

  add(event: MatChipInputEvent, val: datasModel[]): void {
    const value = (event.value || '').trim();
    if (value) {
      val.push({ name: value });
    }
    event.chipInput?.clear();
  }

  remove(values: datasModel[], val: number): void {
    if (val >= 0) {
      values.splice(val, 1);
    }
  }

  edit(val: datasModel[], index: number, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(val, index);
      return;
    }
    if (index >= 0) {
      val[index].name = value;
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  changeAccess() {
    this.changeAccessType = !this.changeAccessType;
  }

  onSubmit(): void {
    if (this.departmentName) {
      this.dialogRef.close(this.departmentName);
    }
  }
}
