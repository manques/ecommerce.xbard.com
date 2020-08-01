import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
// components
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SharedModule,
    HomeComponent
  ]
})

export class PageModule {}
