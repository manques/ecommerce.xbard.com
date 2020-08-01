import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {
  isOld = false;
  isPass = false;
  isNew = false;
  spinner = true;
  response;
  changePassword = this.fb.group({
    oldPassword: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  });
  constructor(private fb: FormBuilder,
              private userService: UserService) {
              }
  ngOnInit() {
    this.spinner = false;
  }
  // short object navigation
  get f() {
      return this.changePassword.controls;
  }
  // match password
  get match() {
    if (this.f.password.valid && this.f.confirmPassword.valid) {
      return this.f.password.value === this.f.confirmPassword.value;
    } else {
      return false;
    }
  }

  // submit form
  submit() {
   this.spinner = true;
   this.userService.changePassword({
     oldPassword: this.f.oldPassword.value,
     newPassword: this.f.password.value
   }).subscribe({
     next: (result: any) => {
      this.response = {
        success: true,
        status: 'success',
        data: result.data,
        message: result.message,
        redirect: ''
     };
     },
     error: (err: any) => {
       this.response = {
          success: false,
          status: 'warning',
          data: null,
          message: err.error.message,
          redirect: ''
       };
       this.spinner = false;
     },
     complete: () => {
       this.spinner = false;
       history.go(-1);
     }
   });
  }
}
