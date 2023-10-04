import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.css'],
})
export class NavListComponent {
  @Input() sidenav: MatSidenav;
  signedin$: BehaviorSubject<null | boolean>;

  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedin$;
  }
}
