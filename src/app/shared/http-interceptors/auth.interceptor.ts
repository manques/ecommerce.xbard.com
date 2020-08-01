import { Injectable } from '@angular/core';
import { HttpInterceptor,
         HttpRequest,
         HttpHandler,
         HttpEvent,
         HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  isRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private auth: AuthService) {}
  // ------------- intercept ---------------------------
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.getJwtToken()) {
      request = this.addToken(request, this.auth.getJwtToken());
     }
    return next.handle(request)
               .pipe(
                 catchError( (error: any) => {
                    if ((error instanceof HttpErrorResponse) &&
                        (error.status === 401) &&
                        (error.error.message.slice(0, 14) === 'jwt expired!!!')) {
                          return this.handle401Error(request, next);
                    } else {
                      return throwError(error);
                    }
                 })
               );
  }

  // --------     handle401Error handler --------------
  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
       this.isRefreshing = true;
       this.refreshTokenSubject.next(null);
       return this.auth.refreshToken().pipe(
         switchMap( (tokens: any) => {
           this.isRefreshing = false;
           this.refreshTokenSubject.next(tokens.jwtToken);
           return next.handle(this.addToken(request, tokens.jwtToken));
         })
       );
    } else {
      return this.refreshTokenSubject.pipe(
        filter( token => token !== null),
        take(1),
        switchMap( jwt => {
          return next.handle(this.addToken(request, jwt));
        } )
      );
    }
  }

  // ---------- add token -------------------
  private addToken(request: HttpRequest<any>, token) {
    return request.clone({
      setHeaders: {
        Authorization : `Bearer ${token}`
      }
    });
  }

}
