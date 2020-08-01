import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-account-sidenav',
  templateUrl: './account-sidenav.component.html',
  styleUrls: ['./account-sidenav.component.css']
})

export class AccountSidenavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<boolean>();
  isAuth;
  user;
  constructor(private auth: AuthService,
              private userService: UserService) {}
  ngOnInit() {
    // user change
    this.userService.userChange.subscribe(result => {
      this.user = result;
    });
    // authentication
    this.auth.authChange.subscribe(result => {
      this.isAuth = result;
    });
  }
  // ------ logout -----
  logout() {
    this.auth.logout();
    this.sidenavClose.emit();
  }
}
