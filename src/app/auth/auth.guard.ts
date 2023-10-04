import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { take, skipWhile } from 'rxjs/operators';

export const authGuard: CanMatchFn = (route, segments) => {
  return inject(AuthService).signedin$.pipe(
    skipWhile((value) => value === null),
    take(1)
  );
};
