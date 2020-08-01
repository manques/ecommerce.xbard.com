import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @Output() sidenavOpener = new EventEmitter<boolean>();
  open(text) {
    return text;
  }
  constructor(private auth: AuthService) {}
  ngOnInit() {
  }
}
