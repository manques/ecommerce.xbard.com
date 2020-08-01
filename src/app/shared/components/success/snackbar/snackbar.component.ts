import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})

export class SnackBarComponent implements OnInit {
  Object = Object;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              public snackbarRef: MatSnackBarRef<SnackBarComponent>,
              private router: Router) {}
  ngOnInit() {
    this.snackbarRef.afterDismissed().subscribe( () => {
      console.log(this.data.redirected);
      this.router.navigate([this.data.redirected || '']);
    });
  }
  close() {
    this.snackbarRef.dismiss();
  }

}
