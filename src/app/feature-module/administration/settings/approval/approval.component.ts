import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss'],
})
export class ApprovalComponent implements OnInit {
  noticeForm!: FormGroup;
  country = 'India';
  public Approver = [0];

  ngOnInit(): void {
    this.noticeFormInit();
  }

  private noticeFormInit(): void {
    this.noticeForm = new FormGroup({
      approval: new FormControl(''),
      days: new FormControl(''),
    });
  }

  addApprover() {
    this.Approver.push(1);
  }

  dltApproverFunc(index: number) {
    this.Approver.splice(index, 1);
  }
}
