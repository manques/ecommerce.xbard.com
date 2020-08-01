import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-resend-verification',
  templateUrl: './resend-verification.component.html',
  styleUrls: ['./resend-verification.component.css']
})

export class ResendVerificationComponent implements OnInit {
  params;
  spinner;
  email;
  response;
  constructor(private route: ActivatedRoute,
              private userService: UserService) {}
  ngOnInit() {
    this.spinner = true;
    this.params = this.route.snapshot.queryParams;
    console.log(this.params);
    this.email = this.params.email;
    this.resendEmailVerification();
  }

  resendEmailVerification() {
      this.userService.resendEmailVerification(this.email).subscribe({
        next: (result: any) => {
          console.log(result);
          if (result.data) {
            // link send
            this.response = {
              success: true,
              status: 'success',
              message: result.message,
              data: result.data,
              redirected: ''
            };
          } else {
            //  verified
            this.response = {
              success: true,
              status: 'success',
              message: result.message,
              data: null,
              redirected: '/login'
            };
          }
        },
        error: (err: any) => {
          console.log(err);
          this.spinner = false;
          this.response = {
              success: false,
              status: 'success',
              message: err.error.message,
              data: null,
              redirected: ''
          };
        },
        complete: () => {
          this.spinner = false;
        }
      });
  }
}
