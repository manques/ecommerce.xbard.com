import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-agm-maps',
  templateUrl: './agm-maps.component.html',
  styleUrls: ['./agm-maps.component.css']
})

export class AgmMapsComponent implements OnInit {
  @Input() mapOptions: any;
  constructor() {}
  ngOnInit() {}
}
