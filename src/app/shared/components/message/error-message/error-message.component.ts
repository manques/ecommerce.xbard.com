import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from '../message-snackbar/message-snackbar.component';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})

export class ErrorMessageComponent implements OnInit {
  @Input() dataError: any;
  constructor(private snackbar: MatSnackBar) {}
  ngOnInit() {
    this.snackbar.openFromComponent(MessageSnackbarComponent, {
      data: this.dataError,
      duration: 3 * 1000,
      panelClass: ['error-style'],
      verticalPosition: 'top'
    });
  }
}
