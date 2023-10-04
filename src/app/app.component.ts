import { Component, inject } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  events: string[] = [];
  opened: boolean;
  auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;
  showBackground: boolean = true;

  constructor(
    private authService: AuthService,
    private location: Location,
    private router: Router
  ) {
    this.authStateSubscription = this.authState$.subscribe(
      (aUser: User | null) => {
        if (aUser) {
          if (
            this.location.path() === '/signup' ||
            this.location.path() === '/login'
          ) {
            this.router.navigateByUrl('/training/new-training');
          }
          this.authService.signedin$.next(true);
        } else {
          if (this.location.path().startsWith('/training')) {
            this.router.navigateByUrl('/login');
          }
          this.authService.signedin$.next(false);
        }
      }
    );
  }

  ngOnInit() {
    this.router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd) {
        if (this.location.path() == '/not-found') {
          this.showBackground = false;
        } else {
          this.showBackground = true;
        }
      }
    });
  }
}
