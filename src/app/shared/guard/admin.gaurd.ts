import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGaurd implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate() {
    if (!this.auth.isLoggedIn()) {
      return this.router.navigate(['/login']);
    } else {
      return this.auth.isLoggedIn();
    }
  }
}
