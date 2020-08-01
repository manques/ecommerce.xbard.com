import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})

export class CarouselComponent implements OnInit {
  loop = interval(4000);
  sliders = [
    { src : '../../../../assets/slider/banner-904884_1920.jpg',
      caption: 'caption1'
    },
    { src : '../../../../assets/slider/banner-904887_1920.jpg',
      caption: 'caption2'
    },
    { src : '../../../../assets/slider/banner-909710_1920.jpg',
      caption: 'caption3'
    },
    { src : '../../../../assets/slider/computer-2914933_1920.jpg',
      caption: 'caption4'
    },
    { src : '../../../../assets/slider/web-1012467_1920.jpg',
      caption: 'caption5'
    },
    { src : '../../../../assets/slider/world-1014504_1920.jpg',
    caption: 'caption6'
    }
  ];
  display;
  i = -1;
  n;
  constructor() {}
  ngOnInit() {
   this.n = this.sliders.length;
   this.show();
   this.loop.subscribe( n => {
     console.log();
     this.show();
   } );
  }
  show() {
    this.i++;
    if (this.i === this.n) {
      this.i = 0;
    }
    this.display = this.sliders[this.i];
   }
  // end
  increment() {
    this.i++;
    if (this.i > (this.n - 1)) {
      this.i = 0;
    }
    this.display = this.sliders[this.i];
  }
  // decrement
  decrement() {
    this.i--;
    if (this.i < 0) {
      this.i = this.n - 1;
    }
    this.display = this.sliders[this.i];
  }
  selected(index) {
    this.i = index;
    this.display = this.sliders[this.i];
  }
}
