import { NgModule } from '@angular/core';
import { DisplayDatePipe } from './display-date.pipe';
import { CategoriesPipe } from './categories.pipe';
import { BreadcrumbPipe } from './breadcrumb.pipe';

@NgModule({
  declarations: [
    DisplayDatePipe,
    CategoriesPipe,
    BreadcrumbPipe
  ],
  exports: [
    DisplayDatePipe,
    CategoriesPipe,
    BreadcrumbPipe
  ]
})

export class PipeModule {}
