import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.css'],
})
export class NavToolbarComponent {
  @Input() sidenav: MatSidenav;
  signedin$: BehaviorSubject<null | boolean>;

  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedin$;
  }
}
