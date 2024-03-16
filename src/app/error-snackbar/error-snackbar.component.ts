import { Component, Inject, OnInit } from '@angular/core';
import  { MatLegacySnackBarRef as MatSnackBarRef, MAT_LEGACY_SNACK_BAR_DATA as MAT_SNACK_BAR_DATA } from '@angular/material/legacy-snack-bar'; 

@Component({
  selector: 'error-snackbar',
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.scss']
})
export class ErrorSnackbarComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private _snackBarRef: MatSnackBarRef<ErrorSnackbarComponent>) { 
    
  }

  public ngOnInit(): void {
  }

  public dismiss() {
    this._snackBarRef.dismiss();
  }
}

