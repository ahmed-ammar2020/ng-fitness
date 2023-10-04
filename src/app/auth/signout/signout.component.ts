import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css'],
})
export class SignoutComponent {
  constructor(private router: Router, private authService: AuthService) {
    this.authService.signout();
    this.router.navigateByUrl('/login');
  }
}
