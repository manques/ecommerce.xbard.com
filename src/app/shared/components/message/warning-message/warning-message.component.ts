import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from '../message-snackbar/message-snackbar.component';

@Component({
  selector: 'app-warning-message',
  templateUrl: './warning-message.component.html',
  styleUrls: ['./warning-message.component.css']
})

export class WarningMessageComponent implements OnInit {
  @Input() dataWarning: any;
  constructor(private snackbar: MatSnackBar) {}
  ngOnInit() {
    this.snackbar.openFromComponent(MessageSnackbarComponent, {
      data: this.dataWarning,
      duration: 3 * 1000,
      panelClass: ['warning-style'],
      verticalPosition: 'top'
    });
  }
}
