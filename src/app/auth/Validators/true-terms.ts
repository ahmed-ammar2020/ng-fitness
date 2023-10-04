import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TrueTerms implements Validator {
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const agreedToTerms = control.value;
    if (agreedToTerms) {
      return null;
    }

    return { doesntAgreeToTerms: true };
  }
}
