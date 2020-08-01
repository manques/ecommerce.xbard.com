import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// http modules
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// routing module
import { AppRoutingModule } from './app-routing.module';
//  import  all navigation module
import { NavModule } from './nav/nav.module';
// root material module
import { SharedModule } from './shared/shared.module';
// user module
import { UserModule } from './user/user.module';
// page
import { PageModule } from './page/page.module';

// component
import { AppComponent } from './app.component';

// interceptor
import { AuthInterceptor } from './shared/http-interceptors/auth.interceptor';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NavModule,
    HttpClientModule,
    UserModule,
    PageModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
