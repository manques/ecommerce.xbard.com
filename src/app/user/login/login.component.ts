import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  isSpinner = false;
  isPassword = false;
  response;
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router
             ) {}
  get f() {
    return this.loginForm.controls;
  }

  // onSubmit
  onSubmit() {
    this.response = {};
    this.isSpinner = true;
    this.auth.login({
      username: !isNaN(Number(this.f.username.value)) ? Number(this.f.username.value) : this.f.username.value,
      password: this.f.password.value
    }).subscribe({
      next: (data: any) => {
        this.response = {
          success: true,
          status: 'success',
          message: 'login successful',
          data: '',
          redirected: ''
        };
        history.go(-1);
      },
      error: (err: any) => {
        this.isSpinner = false;
        this.response = {
          success: false,
          status: 'warning',
          message: err.error.message,
          data: null,
          redirected: ''
        };
      },
      complete: () => {
      }
    });
  }
}
