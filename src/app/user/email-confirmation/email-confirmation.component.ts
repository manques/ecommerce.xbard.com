import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})

export class EmailConfirmationComponent implements OnInit {
  spinner = false;
  response;
  email;
  token;
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) {}
  ngOnInit() {
   this.spinner = true;
   console.log(this.route);
   this.token = this.route.snapshot.queryParams.token;
   this.email = this.route.snapshot.queryParams.id;
   console.log(this.token);
   console.log(this.email);
   if (this.email && this.token) {
    this.confirmation();
   }
  }

  // cal confirmation if id & token exist
  confirmation() {
    // start
    this.userService.confirmation( { email: this.email , token: this.token } ).subscribe({
      next: (result: any) => {
        console.log(result);
        this.response = {
          success: true,
          status: 'success',
          message: result.message,
          data: null,
          redirected: '/login'
        };
      },
      error: (err: any) => {
        console.log(err);
        this.spinner = false;
        if (err.error.status === 498) {
           this.response = {
             success: false,
             status: 'warning',
             message: err.error.message.split(':')[0],
             data: null,
             redirected: ''
           };
        } else if (err.error.status === 404) {
          this.response = {
            success: false,
            status: 'info',
            message: err.error.message,
            data: null,
            redirected: '/signup'
          };
        } else {
          this.response = {
            success: false,
            status: 'error',
            message: err.error.message,
            data: null,
            redirected: ''
          };
        }
      },
      complete: () => {
        console.log('complete');
        this.spinner = false;
      }
     });
    // end
  }
  // call resend component
  resend() {
    console.log('resend');
    this.router.navigate(['/resend'], { queryParams: { email: this.email } });
  }
}
