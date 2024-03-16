import { Component, Inject, OnInit } from '@angular/core';
import  { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'; 

@Component({
  selector: 'success-snackbar',
  templateUrl: './success-snackbar.component.html',
  styleUrls: ['./success-snackbar.component.scss']
})
export class SuccessSnackbarComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private _snackBarRef: MatSnackBarRef<SuccessSnackbarComponent>) { 
    
  }

  public ngOnInit(): void {
  }

  public dismiss() {
    this._snackBarRef.dismiss();
  }
}

