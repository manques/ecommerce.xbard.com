import { NgModule } from '@angular/core';
// import { DirectiveModule } from '../directive/directive.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../module/material.module';
import { SpinnerComponent } from './loaders/spinner/spinner.component';
import { SuccessComponent } from './success/success.component';
import { SnackBarComponent } from './success/snackbar/snackbar.component';
// message component
import { SuccessMessageComponent } from './message/success-message/success-message.component';
import { ErrorMessageComponent } from './message/error-message/error-message.component';
import { WarningMessageComponent } from './message/warning-message/warning-message.component';
import { InfoMessageComponent } from './message/info-message/info-message.component';
import { MessageSnackbarComponent } from './message/message-snackbar/message-snackbar.component';
import { MessageComponent } from './message/message.component';
//
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// tools
import { CarouselComponent } from './carousel/carousel.component';

// social media
import { GoogleSignInComponent } from '../components/google-sign-in/google-sign-in.component';
// google maps
import { GoogleMapsComponent } from '../components/maps/google-maps/google-maps.component';
// agm (angular google map)
import { AgmCoreModule } from '@agm/core';
import { AgmMapsComponent } from '../components/maps/agm-maps/agm-maps.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    SuccessComponent,
    SnackBarComponent,
    SuccessMessageComponent,
    ErrorMessageComponent,
    WarningMessageComponent,
    InfoMessageComponent,
    MessageSnackbarComponent,
    PageNotFoundComponent,
    CarouselComponent,
    MessageComponent,
    GoogleSignInComponent,
    GoogleMapsComponent,
    AgmMapsComponent
    // DirectiveModule
  ],
  imports: [
    MaterialModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDuhvzOnBonq_gIDpy1YhvoN9-ViI5Jf3U',
    })
  ],
  exports: [
    SpinnerComponent,
    MaterialModule,
    CommonModule,
    SuccessComponent,
    SnackBarComponent,
    SuccessMessageComponent,
    ErrorMessageComponent,
    WarningMessageComponent,
    InfoMessageComponent,
    MessageSnackbarComponent,
    PageNotFoundComponent,
    CarouselComponent,
    MessageComponent,
    GoogleSignInComponent,
    GoogleMapsComponent,
    AgmMapsComponent,
    AgmCoreModule
    // DirectiveModule
  ]
})

export class ComponentModule {}
