import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Response } from '../../shared/model/response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  response: Response;
  isSpinner = false;
  isFullWidth = false;
  isPassword = true;
  isConfirmPassword = true;
  seller = false;
  signupForm: FormGroup;
  constructor(private fb: FormBuilder,
              private user: UserService,
              private router: Router ) {
              }
  ngOnInit() {
    // this.onMatch();
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      isSeller: ['']
    });
  }

  // password match
  get onMatch() {
    if ( (this.fg.password?.value) === (this.fg.confirmPassword?.value)) {
        return true;
    }
    return false;
  }
  //
  get fg() { return this.signupForm.controls; }
  get isNumber() {
    return !isNaN(Number(this.fg.phone.value));
  }
  // submit form
  onSubmit() {
    this.response = null;
    this.isSpinner = true;
    this.user.signup({
      name: this.fg.name.value,
      email: this.fg.email.value,
      phone: Number(this.fg.phone.value),
      password: this.fg.password.value,
      isSeller: this.fg.isSeller.value === '' ? false : this.fg.isSeller.value
    }).subscribe({
      next: (result: any) => {
        console.log(result);
        this.response = {
          success: result.success,
          status: 'success',
          message: result.message,
          data: result.data,
          redirected: ''
        };
      },
      error: (err: any) => {
        console.log(err);
        this.isSpinner = false;
        if (err.error.status === 409) {
          this.response = {
            success: false,
            status: 'info',
            message: err.error.message.message1,
            data: err.error.data,
            redirected: '/login'
          };
        } else {
          console.log(err);
          this.response = {
            success: false,
            status: 'error',
            message: err.error.message,
            data: err.error.data,
            redirected: ''
          };
          console.log(this.response);
        }
      },
      complete: () => {
        this.isSpinner = false;
      }
    });
  }

  // resend verification code
  resend() {
    this.router.navigate(['resend'], { queryParams: { id: this.fg.email.value}});
  }
}
