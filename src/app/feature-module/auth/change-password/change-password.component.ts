import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from 'src/app/core/helpers/constants/pattern.constant';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CommonService } from 'src/app/shared/common/common.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  public routes = routes;
  changePasswordForm!: FormGroup;
  isSubmitted: boolean = false;
  password: boolean[] = [false];
  base = '';
  page = '';
  last = '';
  constructor(private common: CommonService, private renderer: Renderer2) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
    if (this.base == 'change-password') {
      this.renderer.addClass(document.body, 'account-page');
    }
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [
        Validators.required,
        PasswordValidator.validate(),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        PasswordValidator.validate(),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        PasswordValidator.validate(),
      ]),
    });
  }

  get c(): { [key: string]: AbstractControl } {
    return this.changePasswordForm.controls;
  }

  public togglePassword(index: any) {
    this.password[index] = !this.password[index];
  }

  changePassword(): void {
    this.isSubmitted = true;
    if (this.changePasswordForm.invalid) return;
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'account-page');
  }
}
