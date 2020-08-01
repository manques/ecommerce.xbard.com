import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-sidenav',
  templateUrl: './top-sidenav.component.html',
  styleUrls: ['./top-sidenav.component.css']
})

export class TopSidenavComponent {
  @Output() sidenavClose = new EventEmitter<true>();
}
