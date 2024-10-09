import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { routes } from 'src/app/core/core.index';
import { DepartmentContent } from 'src/app/core/helpers/constants/modals.constants';
import { PreviewDialogComponent } from 'src/app/shared/dialogs/preview-dialog/preview-dialog.component';

@Component({
  selector: 'app-custom-template',
  templateUrl: './custom-template.component.html',
  styleUrl: './custom-template.component.scss',
})
export class CustomTemplateComponent {
  public routes = routes;
  multipleFiles: File[] = [];
  fileSrc: string[] = [];
  isfile: boolean = false;

  editorValue: any;
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

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.editor = new Editor();
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

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
