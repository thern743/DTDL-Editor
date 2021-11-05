import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  public dtmiRegEx: RegExp = new RegExp("^dtmi:(?:_+[A-Za-z0-9]|[A-Za-z])(?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::(?:_+[A-Za-z0-9]|[A-Za-z])(?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$");

  constructor() { }

  public ValidDtmi(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = this.dtmiRegEx.test(control.value);
      return isValid ? null : { forbiddenName: { value: control.value } };
    };
  }
}
