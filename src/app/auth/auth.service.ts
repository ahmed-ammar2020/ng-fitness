import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signedin$ = new BehaviorSubject<any>(null); // takes a default value
  pending$ = new BehaviorSubject<boolean>(false);

  constructor(private auth: Auth) {}

  signup(email: any, password: any) {
    // const auth = getAuth();
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signin(email: any, password: any) {
    // const auth = getAuth();
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signout() {
    // const auth = getAuth();
    signOut(this.auth)
      .then(() => {
        this.signedin$.next(false);
      })
      .catch((error) => {
        // An error happened.
      });
  }
}
