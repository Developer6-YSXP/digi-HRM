import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/core.index';
import { LocalConstant } from 'src/app/core/helpers/constants/local.constant';
import { PasswordValidator } from 'src/app/core/helpers/constants/pattern.constant';
import { LocalService } from 'src/app/core/services/local/local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public routes = routes;
  loginForm!: FormGroup;
  password: boolean[] = [false];
  isSubmitted: boolean = false;

  private localService = inject(LocalService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        PasswordValidator.validate(),
      ]),
    });
  }

  get c(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  navigate(): void {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;
    if (this.loginForm.controls['email'].value.includes('admin')) {
      this.localService.setLocalItem(LocalConstant.ROLE, 0);
      this.router.navigate([routes.adminDashboard]);
    } else {
      this.localService.setLocalItem(LocalConstant.ROLE, 1);
      this.router.navigate([routes.employee]);
    }
  }

  public togglePassword(index: any) {
    this.password[index] = !this.password[index];
  }
}
