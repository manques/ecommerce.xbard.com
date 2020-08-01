import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';
import { ProductService } from '../../../shared/services/shop/product/product.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})

export class MainNavbarComponent implements OnInit {
  isAuth;
  user;
  cartItems;
  @Output() sidenavOpen = new EventEmitter<boolean>();
  searchToggle = false;
  categoriesToggle = false;
  constructor(private auth: AuthService,
              private userService: UserService,
              private ps: ProductService) {}
  ngOnInit() {
    this.auth.authChange.subscribe(result => {
      this.isAuth = result;
    });
    // this.userService.fetchUser();
    this.userService.userChange.subscribe(result => {
      this.user = result;
    });
    if (this.auth.isLoggedIn()) {
      this.userService.fetchUser();
    }

    // list cart items
    this.ps.cartListChange.subscribe(result => {
      this.cartItems = [];
      this.cartItems = result;
    });

    // delete update
    this.ps.cartUpdateDeleteChange.subscribe(result => {
      this.cartItems = [];
      this.cartItems = result;
    });
  }
  // logout
  logout() {
    this.auth.logout();
  }
}
