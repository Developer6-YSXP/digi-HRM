import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidator {
  private pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/;

  static validate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // return null if there's no value (validating optional fields)
      }

      const isValid = new PasswordValidator().pattern.test(control.value);
      return isValid ? null : { invalidPassword: true };
    };
  }
}
