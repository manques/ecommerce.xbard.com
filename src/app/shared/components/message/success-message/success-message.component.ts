import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from '../message-snackbar/message-snackbar.component';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})

export class SuccessMessageComponent implements OnInit {
  @Input() dataMessage: any;
  constructor(private snackbar: MatSnackBar) {}
  ngOnInit() {
    this.snackbar.openFromComponent(MessageSnackbarComponent, {
      data: this.dataMessage,
      duration: 3 * 1000,
      panelClass: ['success-style'],
      verticalPosition: 'top'
    });
  }
}
