import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentContent } from 'src/app/core/helpers/constants/modals.constants';
import { routes } from 'src/app/core/helpers/routes/routes';
import { PreviewDialogComponent } from 'src/app/shared/dialogs/preview-dialog/preview-dialog.component';

@Component({
  selector: 'app-offer-letter',
  templateUrl: './offer-letter.component.html',
  styleUrl: './offer-letter.component.scss',
})
export class OfferLetterComponent implements OnInit {
  public routes = routes;
  basicDetailsForm!: FormGroup;
  addSalary!: FormGroup;
  editorValue!: string;
  emailValue!: string;
  multipleFiles: File[] = [];
  fileSrc: string[] = [];
  isfile: boolean = false;

  logoUrl: string = 'assets/img/logos/logo.png';

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.editorValue = `
    <p>Dear [Candidate Name],</p>
    
    <p>We are pleased to extend to you an offer for the position of <strong>Software Engineer</strong> in our <strong>Engineering Department</strong> at [Company Name].</p>
    
    <p>As part of our team, you will be an integral contributor to our projects and initiatives. Your starting salary will be <strong>₹60,000 per annum</strong>, and you will be eligible for [mention any bonuses, benefits, or perks, if applicable].</p>
    
    <p>Your anticipated start date is <strong>November 1, 2024</strong>. We are excited about the possibility of you joining our team and contributing to our mission.</p>
    
    <p>Please review the attached documents that outline the terms of employment, benefits, and other important information. If you have any questions, feel free to reach out to us.</p>
    
    <p>Congratulations on your offer, and we look forward to welcoming you to [Company Name]!</p>
    
    <p>Best Regards,</p>
    <p>[Your Name]<br />
    [Your Title]<br />
    [Company Name]<br />
    [Contact Information]</p>
  `;

    this.emailValue = this.editorValue;
    this.basicFormInit();
    this.salaryFormInit();
  }

  private basicFormInit(): void {
    this.basicDetailsForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      dateOfJoining: new FormControl('', Validators.required),
      offerDate: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      jobType: new FormControl('', Validators.required),
      managerName: new FormControl('', Validators.required),
      noticePeriod: new FormControl('', Validators.required),
      workAddress: new FormGroup({
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        pincode: new FormControl('', Validators.required),
      }),
      candidateAddress: new FormGroup({
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        pincode: new FormControl('', Validators.required),
      }),
    });
  }

  private salaryFormInit(): void {
    this.addSalary = new FormGroup({
      name: new FormControl('', Validators.required),
      netSalary: new FormControl('', Validators.required),
      basic: new FormControl('', Validators.required),
      da: new FormControl('', Validators.required),
      hra: new FormControl('', Validators.required),
      conveyance: new FormControl('', Validators.required),
      allowance: new FormControl('', Validators.required),
      medicalAllowance: new FormControl('', Validators.required),
      othersAdd: new FormControl('', Validators.required),
      tds: new FormControl('', Validators.required),
      esi: new FormControl('', Validators.required),
      pf: new FormControl('', Validators.required),
      leave: new FormControl('', Validators.required),
      profTax: new FormControl('', Validators.required),
      labour: new FormControl('', Validators.required),
      othersDed: new FormControl('', Validators.required),
    });
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

  onSubmit(flag: string): void {
    switch (flag) {
      case 'basic':
        console.log(this.basicDetailsForm.value);
        const salaryTab = document.querySelector(
          'a[href="#salary"]'
        ) as HTMLAnchorElement;
        if (salaryTab) {
          salaryTab.click();
        }
        break;

      case 'salary':
        console.log(this.addSalary.value);

        const previewTab = document.querySelector(
          'a[href="#preview"]'
        ) as HTMLAnchorElement;
        if (previewTab) {
          previewTab.click();
        }
        break;

      case 'preview':
        console.log(this.addSalary.value);
        const emailTab = document.querySelector(
          'a[href="#send-email"]'
        ) as HTMLAnchorElement;
        if (emailTab) {
          emailTab.click();
        }
        break;
    }
  }
}
