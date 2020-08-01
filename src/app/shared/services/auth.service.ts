import { Injectable } from '@angular/core';
import { config } from '../config/config';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
// http module
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authChange = new Subject<boolean>();
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient,
              private router: Router,
              private userService: UserService
              ) {
                this.userService.loginChange.subscribe(value => {
                  if (!value) {
                    this.logout();
                  }
                });
              }

  // --------------  login ----------------------
  login(data) {
    return this.http
               .post(`${config.apiUrl}/user/login`, data)
               .pipe(
                 tap( value => this.doLoginUser(data.username, value)),
               );
  }
  // authChange subscriber
  authSubscriber() {
    if (this.isLoggedIn()) {
     return this.authChange.next(true);
    } else {
      return this.authChange.next(false);
    }
  }

  isLoggedIn() {
    return !!(this.getJwtToken() || this.getRefreshToken()) ? true : false;
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }
  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: any) {
    console.log(username);
    this.loggedUser = username;
    this.storeTokens(tokens);
    this.authChange.next(true);
    this.userService.fetchUser();
  }

  private storeTokens(tokens: any) {
    this.storeJwtToken(tokens.jwtToken);
    this.storeRefreshToken(tokens.refreshToken);
  }

  private storeJwtToken(token) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  private storeRefreshToken(token) {
    localStorage.setItem(this.REFRESH_TOKEN, token);
  }
// ------------- refresh token --------------------
refreshToken() {
  return this.http.post(`${config.apiUrl}/user/refresh`, {
    refreshToken: `Bearer ${this.getRefreshToken()}`
  }).pipe(
    tap(tokens => {
      this.storeTokens(tokens);
    }),
    catchError( err => {
      this.logout();
      throw err;
    })
  );
}


  // -----------------  logout -----------------------

  logout() {
    this.doLogoutUser();
    this.router.navigate(['login']);
    this.authChange.next(false);
    this.userService.userChange.next(null);
  }

  doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private removeTokens() {
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.JWT_TOKEN);
  }

}
