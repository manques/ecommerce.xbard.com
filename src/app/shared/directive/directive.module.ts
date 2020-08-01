import { NgModule } from '@angular/core';
import { BgDirective } from './bg.directive';
import { TextDirective } from './text.directive';
import { DebounceDirective } from './debounce.directive';

@NgModule({
  declarations: [
    BgDirective,
    TextDirective,
    DebounceDirective
  ],
  imports : [
  ],
  exports: [
    BgDirective,
    TextDirective,
    DebounceDirective
  ]
})

export class DirectiveModule { }
