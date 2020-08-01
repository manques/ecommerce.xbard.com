import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// gaurd
import { AuthGaurd } from './shared/guard/auth.gaurd';
import { AdminGaurd } from './shared/guard/admin.gaurd';

// components
import { SignupComponent } from './user/signup/signup.component';
import { LoginComponent } from './user/login/login.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { HomeComponent } from './page/home/home.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { EmailConfirmationComponent } from './user/email-confirmation/email-confirmation.component';
import { ResendVerificationComponent } from './user/resend-verification/resend-verification.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  // user
  { path: 'signup', component: SignupComponent, canActivate: [AuthGaurd] },
  { path: 'confirmation', component: EmailConfirmationComponent },
  { path: 'resend', component: ResendVerificationComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGaurd] },
  { path: 'profile', component: ProfileComponent, canActivate: [AdminGaurd]},
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AdminGaurd]},
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AdminGaurd]},
  // shop routes
  { path: '', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
  // not found
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
