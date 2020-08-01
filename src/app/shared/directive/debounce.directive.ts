import { Directive, HostListener, ElementRef, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounce]'
})

export class DebounceDirective implements OnInit {
  @Input('appDebounce') typeStop: string;
  textStop = new Subject<string>();
  constructor(private el: ElementRef) {}
  ngOnInit() {
    // this.onStopTyping(this.typeStop);
    this.textStop
        .pipe(
          debounceTime(400)
        )
        .subscribe( data => {
           console.log(data);
           console.log(this.el.nativeElement);
    });
  }
  @HostListener('keyup') onKeyup() {
    this.textStop.next(this.typeStop);
    // this.onStopTyping(this.typeStop);
  }
  // private onStopTyping(text: string) {
  //   console.log(text);
  //   console.log(this.el.nativeElement);
  // }
}
