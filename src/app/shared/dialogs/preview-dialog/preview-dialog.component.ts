import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PreviewFile } from 'src/app/core/core.index';

@Component({
  selector: 'app-preview-dialog',
  templateUrl: './preview-dialog.component.html',
  styleUrl: './preview-dialog.component.scss',
})
export class PreviewDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PreviewFile,
    public dialogRef: MatDialogRef<PreviewDialogComponent>
  ) {}
  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}
