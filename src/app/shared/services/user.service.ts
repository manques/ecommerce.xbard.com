import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { config } from '../config/config';
import { HeadersService } from './headers.service';
import { User } from '../model/user.model';
import { throwError, Subject } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class UserService {
      loginChange = new Subject<boolean>();
      userChange = new Subject<any>();
      private user: any;
      constructor(private http: HttpClient,
                  private headers: HeadersService,
                  private router: Router
                ) {}
      //  -----------  signup -------------------
      signup(data) {
        return this.http.post(`${config.apiUrl}/user/create`, data, this.headers.getHeaders());
      }

      // ---------------------    profile   -----------------------
      fetchUser() {
        return this.http
                  .get(`${config.apiUrl}/user/profile`)
                  .pipe(
                    catchError( (err: any) => {
                      if (err.error.message.slice(0, 8) === 'refresh:') {
                        // this.auth.logout();
                        this.router.navigate(['/login']);
                      }
                      return throwError(err);
                    }),
                    retry(3)
                  ).subscribe({
                    next: (result: any) => {
                      this.user = result.data;
                      this.userChange.next(this.user);
                    },
                    error: (err: any) => {
                      this.loginChange.next(false);
                    },
                    complete: () => {
                    }
                  });
      }
    // ------------- set user --------------------
      setUser(data) {
        this.user = data;
      }
      // ----------------- get user ----------------------
      getUser() {
          return this.user;
      }

      // ------------------------ change seller ---------------------------
      changeSeller(seller) {
        this.http.put(`${config.apiUrl}/user/isSeller`,
                      { isSeller: seller }
                    ).subscribe({
                      next: (data: any) => {
                      },
                      error: (err: any) => {
                      },
                      complete: () => {
                      }
                    });
      }

      // ----------------------- change background image -------------------------
      changeBg(formData) {
        return this.http
                  .put(`${config.apiUrl}/user/bgImage`, formData, {
                    reportProgress: true,
                    observe: 'events'
                  })
                  .subscribe({
                    next: (data: any) => {
                    },
                    error: (err: any) => {
                    },
                    complete: () => {
                    }
                  });
      }

      // ------------------------- change profile image -------------------
      changeProfile(selectedFile) {
        // form data
        const formData = new FormData();
        formData.append('picture', selectedFile);
        return this.http
                  .put(`${config.apiUrl}/user/picture`, formData, {
                    reportProgress: true,
                    observe: 'events'
                  }).subscribe({
                    next: (result: any) => {
                    },
                    error: (err: any) => {
                    },
                    complete: () => {
                    }
                  });
      }
      // ----------------- change password ------------------------
      changePassword(passObj) {
        return this.http.put(`${config.apiUrl}/user/changePassword`, passObj);
      }

      // -----------------  edit profile --------------------------
      updateProfile(dataObj) {
        const updateSocial = {};
        for (const key of Object.keys(dataObj.social)) {
            if ((dataObj.social[key] === undefined) || !dataObj.social[key]) {
                // nothing do
            } else {
                updateSocial[key] = dataObj.social[key];
            }
        }
        dataObj.social = updateSocial;
        //  update http request
        return this.http.put(`${config.apiUrl}/user/updateProfile`, dataObj);
      }
      //  ----------------   confirmation token ------------------------
      confirmation( obj ) {
        return this.http.get(`${config.apiUrl}/user/confirmation?email=${obj.email}&token=${obj.token}`);
      }
      resendEmailVerification(email) {
        return this.http.get(`${config.apiUrl}/user/resendEmailVerification?email=${email}`);
      }
}
