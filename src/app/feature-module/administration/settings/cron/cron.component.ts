import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cron',
  templateUrl: './cron.component.html',
  styleUrls: ['./cron.component.scss'],
})
export class CronComponent implements OnInit {
  cronForm!: FormGroup;

  ngOnInit(): void {
    this.cronFormInit();
  }

  private cronFormInit(): void {
    this.cronForm = new FormGroup({
      key: new FormControl(''),
      backup: new FormControl(''),
    });
  }
}
