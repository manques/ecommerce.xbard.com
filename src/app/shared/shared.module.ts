import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './module/material.module';
// directive module
import { DirectiveModule } from './directive/directive.module';
// component module
import { ComponentModule } from './components/component.module';
// pipe module
import { PipeModule } from './pipe/pipe.module';
// form modules
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// agm (angular google map)
import { AgmCoreModule } from '@agm/core';

// services
import { AuthService } from './services/auth.service';
import { GetMonthService } from './services/get-month.service';
import { HeadersService } from './services/headers.service';
import { HttpService } from './services/http.service';
import { UserService } from './services/user.service';
import { WishlistService } from './services/shop/product/wishlist.service';

@NgModule({
  declarations: [
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DirectiveModule,
    PipeModule,
    ComponentModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDuhvzOnBonq_gIDpy1YhvoN9-ViI5Jf3U',
    })
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DirectiveModule,
    PipeModule,
    ComponentModule,
    RouterModule,
    AgmCoreModule,
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        GetMonthService,
        HeadersService,
        HttpService,
        UserService,
        WishlistService
      ]
    };
  }
}
