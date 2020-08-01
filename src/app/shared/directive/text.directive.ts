import { Directive,
         ElementRef,
         Input,
         OnInit
        } from '@angular/core';

@Directive({
  selector: '[appText]'
})

export class TextDirective implements OnInit {

  @Input('appText') textColor: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.onResetColor(this.textColor);
  }
  // text color set / reset
  onResetColor(color: string) {
    this.el.nativeElement.style.color = color;
  }
}
