import { Component, OnInit } from '@angular/core';
import { allroles } from 'src/app/core/services/interface/models';
import { DataService } from 'src/app/core/services/data/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-roles-and-permissions',
  templateUrl: './roles-and-permissions.component.html',
  styleUrl: './roles-and-permissions.component.scss',
})
export class RolesAndPermissionsComponent implements OnInit {
  public allroles: Array<allroles>;
  addRoleForm!: FormGroup;

  constructor(private data: DataService) {
    this.allroles = this.data.allroles;
  }

  ngOnInit(): void {
    this.roleFormInit();
  }

  private roleFormInit(): void {
    this.addRoleForm = new FormGroup({
      roleName: new FormControl('', Validators.required),
    });
  }
}
