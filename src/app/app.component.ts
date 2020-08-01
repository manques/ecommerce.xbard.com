import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'ecommerce';
  constructor(private auth: AuthService,
              private userService: UserService,
              private cdr: ChangeDetectorRef ) {}
  ngAfterViewInit() {
    this.auth.authSubscriber();
    this.auth.authChange.subscribe(result => {
      this.userService.fetchUser();
    });
    this.cdr.detectChanges();
  }
}
