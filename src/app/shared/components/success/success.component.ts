import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../success/snackbar/snackbar.component';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})

export class SuccessComponent implements OnInit {
  @Input() successResponse: any;
  action = 'close';
  constructor(private snackbar: MatSnackBar) {}
  ngOnInit() {
    this.snackbar.openFromComponent(SnackBarComponent,
                                    {
                                    data: this.successResponse,
                                    duration: 3000 * 1000,
                                    panelClass: ['success-style'],
                                    verticalPosition: 'top'
                                  });
  }

  // close() {
  //   this.snackBarRef.dismiss();
  // }
}
