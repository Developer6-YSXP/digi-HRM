import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-user-assets-details',
  templateUrl: './user-assets-details.component.html',
  styleUrls: ['./user-assets-details.component.scss'],
})
export class UserAssetsDetailsComponent implements OnInit {
  profileInfoForm!: FormGroup;
  reportIssueForm!: FormGroup;
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  bsValue = new Date();
  public routes = routes;
  selectedList1: data[] = [{ value: 'Male' }, { value: 'Female' }];
  selectedList2: data[] = [
    { value: 'Select Department' },
    { value: 'Web Development' },
    { value: 'IT Management' },
    { value: 'Marketing' },
  ];
  selectedList3: data[] = [
    { value: 'Select Designation' },
    { value: 'Web Designer' },
    { value: 'Web Developer' },
    { value: 'Android Developer' },
  ];
  selectedList4: data[] = [
    { value: '-' },
    { value: 'Wilmer Deluna' },
    { value: 'Lesley Grauer' },
    { value: 'Jeffery Lalor' },
  ];

  ngOnInit(): void {
    this.profileInfoFormInit();
    this.reportIssueFormInit();
  }

  private profileInfoFormInit(): void {
    this.profileInfoForm = new FormGroup({
      profileImg: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      birthDate: new FormControl(''),
      gender: new FormControl(''),
      address: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      pinCode: new FormControl(''),
      phone: new FormControl(''),
      department: new FormControl(''),
      designation: new FormControl(''),
      reportTo: new FormControl(''),
    });
  }

  private reportIssueFormInit(): void {
    this.reportIssueForm = new FormGroup({
      description: new FormControl(''),
    });
  }
}
