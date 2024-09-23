import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService, allroles } from 'src/app/core/core.index';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  roleForm!: FormGroup;
  public allroles: Array<allroles>;
  constructor(public router: Router, private dataservice: DataService) {
    this.allroles = this.dataservice.allroles;
  }

  ngOnInit(): void {
    this.roleFormInit();
  }

  private roleFormInit(): void {
    this.roleForm = new FormGroup({
      name: new FormControl(''),
    });
  }
}
