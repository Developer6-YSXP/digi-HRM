import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-invoice-settings',
  templateUrl: './invoice-settings.component.html',
  styleUrls: ['./invoice-settings.component.scss'],
})
export class InvoiceSettingsComponent implements OnInit {
  public invoiceSettings!: FormGroup;
  constructor() {}

  ngOnInit() {
    this.invoiceFormInit();
  }

  private invoiceFormInit(): void {
    this.invoiceSettings = new FormGroup({
      invoicePrefix: new FormControl('INV', Validators.required),
      invoiceLogo: new FormControl(''),
    });
  }
}
