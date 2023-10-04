import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  pending$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.pending$ = this.authService.pending$;
  }

  signinForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });

  submitForm() {
    this.authService.pending$.next(true);
    this.authService
      .signin(this.signinForm.value.email, this.signinForm.value.password)
      .then((userCredential) => {
        this.authService.pending$.next(false);
        const user = userCredential.user;
        this.authService.signedin$.next(true);
        this.router.navigateByUrl('/training/new-training');
      })
      .catch((error) => {
        this.authService.pending$.next(false);
        const errorCode = error.code;

        if (errorCode === 'auth/invalid-login-credentials') {
          this.signinForm.setErrors({ emailPasswordInvalid: true });
        }

        if (errorCode === 'auth/network-request-failed') {
          this.signinForm.setErrors({ noConnection: true });
        }
        this.authService.signedin$.next(false);
      });
  }
}
