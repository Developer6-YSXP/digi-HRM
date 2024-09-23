import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CommonService } from 'src/app/shared/common/common.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public routes = routes;
  resetForm!: FormGroup;
  isSubmitted: boolean = false;
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
    if (this.base == 'forgot-password') {
      this.renderer.addClass(document.body, 'account-page');
    }
  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  get c(): { [key: string]: AbstractControl } {
    return this.resetForm.controls;
  }

  reset(): void {
    this.isSubmitted = true;
    if (this.resetForm.invalid) return;
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'account-page');
  }
}
