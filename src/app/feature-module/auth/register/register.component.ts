import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from 'src/app/core/helpers/constants/pattern.constant';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public routes = routes;
  registerForm!: FormGroup;
  isSubmitted: boolean = false;
  password: boolean[] = [false];

  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        PasswordValidator.validate(),
      ]),
      repeatPassword: new FormControl('', [
        Validators.required,
        PasswordValidator.validate(),
      ]),
    });
  }

  get c(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  navigate() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) return;
    this.router.navigate([routes.login]);
  }

  public togglePassword(index: any) {
    this.password[index] = !this.password[index];
  }
}
