import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ComponentModule } from '../shared/components/component.module';
// components
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ResendVerificationComponent } from './resend-verification/resend-verification.component';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    EmailConfirmationComponent,
    ResendVerificationComponent
  ],
  imports: [
    SharedModule,
    ComponentModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    SharedModule,
    SignupComponent,
    ComponentModule,
    LoginComponent,
    ProfileComponent,
    RouterModule,
    CommonModule,
    ChangePasswordComponent,
    EditProfileComponent,
    EmailConfirmationComponent,
    ResendVerificationComponent
  ]
})

export class UserModule {}
