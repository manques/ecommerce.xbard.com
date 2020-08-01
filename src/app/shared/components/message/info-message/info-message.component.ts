import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from '../message-snackbar/message-snackbar.component';

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.css']
})

export class InfoMessageComponent implements OnInit {
  @Input() infoData: any;
  constructor(private snackbar: MatSnackBar) {}
  ngOnInit() {
    this.snackbar.openFromComponent(MessageSnackbarComponent, {
      data: this.infoData,
      duration: 3 * 1000,
      panelClass: ['info-style'],
      verticalPosition: 'top'
    });
  }
}
