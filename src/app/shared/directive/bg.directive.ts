import { Directive,
         ElementRef,
         Input,
         OnInit
         } from '@angular/core';

@Directive({
  selector: '[appBg]'
})

export class BgDirective implements OnInit {
  // binding bgcolor
  @Input('appBg') bgColor: string;
  constructor(private el: ElementRef) {}

  ngOnInit() {
     // initialization of backgound // default
     this.onChangeBg(this.bgColor);
  }
  // background color changer
  private onChangeBg(color: string) {
    this.el.nativeElement.style.backgroundColor = color || null;
  }
}
