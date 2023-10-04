import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrueTerms } from '../Validators/true-terms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  maxDate: Date;
  pending$: BehaviorSubject<boolean>;

  constructor(
    private trueTerms: TrueTerms,
    private authService: AuthService,
    private router: Router
  ) {
    this.pending$ = this.authService.pending$;
  }

  signupForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    /*  TODO: validate for a valid date not any string => custom validation => can't read letters
   and input masking if the user enters the data on its own */
    date: new FormControl('', [Validators.required]),
    agreed: new FormControl(false, [
      Validators.required,
      this.trueTerms.validate,
    ]),
  });

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  submitForm() {
    // loading starts
    this.authService.pending$.next(true);
    this.authService
      .signup(this.signupForm.value.email, this.signupForm.value.password)
      .then((userCredential) => {
        // Signed up
        // loading ends
        this.authService.pending$.next(false);
        this.authService.signedin$.next(true);
        this.router.navigateByUrl('/training/new-training');
      })
      .catch((error) => {
        // loading ends
        this.authService.pending$.next(false);
        const errorCode = error.code;

        if (errorCode === 'auth/email-already-in-use') {
          this.signupForm.setErrors({ emailInUse: true });
        }

        if (errorCode === 'auth/network-request-failed') {
          this.signupForm.setErrors({ noConnection: true });
        }
        // Firebase: Error (auth/email-already-in-use)
        // auth/network-request-failed

        this.authService.signedin$.next(false);
      });
  }
}
