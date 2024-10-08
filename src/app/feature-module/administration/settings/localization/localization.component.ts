import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
interface data {
  value: string;
}
@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.scss'],
})
export class LocalizationComponent implements OnInit {
  selectedList1: data[] = [{ value: 'USA' }, { value: 'United Kingdom' }];
  selectedList2: data[] = [
    { value: '15/05/2016' },
    { value: '15.05.2016' },
    { value: '15-05-2016' },
    { value: '05/15/2016' },
    { value: '2016/05/15' },
    { value: '2016-05-15' },
    { value: 'May 15 2016' },
    { value: '15 May 2016' },
  ];
  selectedList3: data[] = [{ value: '(UTC +5:30) Antarctica/Palmer' }];
  selectedList4: data[] = [{ value: 'English' }, { value: 'French' }];
  selectedList5: data[] = [
    { value: 'USD' },
    { value: 'Pound' },
    { value: 'EURO' },
    { value: 'Ringgit' },
  ];

  public localisation!: FormGroup;
  constructor() {}

  ngOnInit() {
    this.localisationFormInit();
  }

  private localisationFormInit(): void {
    this.localisation = new FormGroup({
      defaultCountry: new FormControl('USA', Validators.required),
      dateFormat: new FormControl('15/05/2016', Validators.required),
      timeZone: new FormControl(
        '(UTC +5:30) Antarctica/Palmer',
        Validators.required
      ),
      deafultLanguage: new FormControl('English', Validators.required),
      currencyCode: new FormControl('USD', Validators.required),
    });
  }
}
