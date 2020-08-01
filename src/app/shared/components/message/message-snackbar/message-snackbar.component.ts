import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-snackbar',
  templateUrl: './message-snackbar.component.html',
  styleUrls: ['./message-snackbar.component.css']
})

export class MessageSnackbarComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              private snackbarRef: MatSnackBarRef<MessageSnackbarComponent>,
              private router: Router) {}
  ngOnInit() {
    this.snackbarRef.afterDismissed().subscribe(() => {
      if (this.data.redirected) {
        this.router.navigate([this.data.redirected]);
      }
    });
  }
  close() {
      this.snackbarRef.dismiss();
  }
}
