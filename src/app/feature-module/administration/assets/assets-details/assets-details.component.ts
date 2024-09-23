import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-assets-details',
  templateUrl: './assets-details.component.html',
  styleUrls: ['./assets-details.component.scss'],
})
export class AssetsDetailsComponent implements OnInit {
  public selectedValue1 = '';
  public selectedValue2 = '';
  public routes = routes;
  assignAssestForm!: FormGroup;
  selectedList1: data[] = [
    { value: 'Department 1' },
    { value: 'Department 2' },
  ];
  selectedList2: data[] = [{ value: 'Customer' }, { value: 'Client' }];

  ngOnInit(): void {
    this.assignAssestFormInit();
  }

  private assignAssestFormInit(): void {
    this.assignAssestForm = new FormGroup({
      department: new FormControl('', Validators.required),
      assignTo: new FormControl('', Validators.required),
    });
  }
}
