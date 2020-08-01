import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {
  spinner = true;
  response;
  user;
  editForm;
  resonse;
  constructor(private fb: FormBuilder,
              private userService: UserService) {}
  ngOnInit() {
    this.editForm = this.fb.group({
      name: [ '', Validators.required],
      email: [ { value: '', disabled: true }, [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
      isSeller: [''],
      social: this.fb.group({
        facebook: [''],
        twitter: [''],
        instagram: [''],
        linkedin: [''],
        github: ['']
      })
    });
    if (this.userService.getUser()) {
      this.user = this.userService.getUser();
      this.updateForm();
      this.spinner = false;
    } else {
      this.userService.userChange.subscribe( result => {
        this.user = result;
        this.updateForm();
        this.spinner = false;
      });
    }
  }
  // short object path
  get f() {
    return this.editForm.controls;
  }
  get s() {
    return this.editForm.controls.social.controls;
  }

  // update form
  updateForm() {
    if (this.user) {
      this.editForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        isSeller: this.user.isSeller,
        social: {
          facebook: this.user?.social?.facebook,
          twitter: this.user?.social?.twitter,
          github: this.user?.social?.github,
          instagram: this.user?.social?.instagram
        }
      });
    }
  }
  // submit
  onSubmit() {
    this.userService.updateProfile({
      name: this.f.name.value,
      email: this.f.email.value,
      phone: this.f.phone.value,
      isSeller: this.f.isSeller.value,
      social: {
        facebook: this.s.facebook.value,
        twitter: this.s.twitter.value,
        github: this.s.github.value,
        instagram: this.s.instagram.value
      }
    }).subscribe({
      next: (result: any) => {
        this.resonse = {
          success: true,
          status: 'success',
          message: result.message,
          data: result.data,
          redirected: ''
        };
      },
      error: (err: any) => {
        this.resonse = {
          success: false,
          status: 'warning',
          message: err.error.message,
          data: null,
          redirected: ''
        };
      },
      complete: () => {
        history.go(-1);
      }
    });
  }
}
