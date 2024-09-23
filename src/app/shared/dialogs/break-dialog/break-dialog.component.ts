import { ENTER, COMMA } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  Renderer2,
} from '@angular/core';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShareProject } from 'src/app/core/core.index';
import { datasModel } from 'src/app/feature-module/account/account-list/account-list.component';

@Component({
  selector: 'app-break-dialog',
  templateUrl: './break-dialog.component.html',
  styleUrl: './break-dialog.component.scss',
})
export class BreakDialogComponent {
  departmentName!: string;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  data1: datasModel[] = [];
  addOnBlur = true;
  changeAccessType: boolean = false;
  otherReason: boolean = false;
  radioValue: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ShareProject,
    public dialogRef: MatDialogRef<BreakDialogComponent>,
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

  otherFiled(event: Event): void {
    console.log(event);

    this.radioValue = event;

    this.otherReason = this.radioValue === 4 ? true : false;
  }

  onSubmit(): void {
    this.dialogRef.close(true);
  }
}
