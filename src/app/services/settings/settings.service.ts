import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarComponent } from 'src/app/error-snackbar/error-snackbar.component';
import { SuccessSnackbarComponent } from 'src/app/success-snackbar/success-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _snackBar: MatSnackBar;

  constructor(snackBar: MatSnackBar) {
    this._snackBar = snackBar;    
  }

  public save(settings: any): void {
    try {
      localStorage.setItem("dtdl_editor:setings:baseDtmi", settings);
    } catch (err: any) {
      let msg = err;
      this._snackBar.openFromComponent(ErrorSnackbarComponent, {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 5000,
        panelClass: ["mat-toolbar", "mat-warn"],
        data: { msg: msg }
      });
    }

    this._snackBar.openFromComponent(SuccessSnackbarComponent, {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 5000,
      panelClass: ["mat-toolbar", "mat-primary"],
      data: { msg: "Settings saved." }
    });
  }

  public load(): string | null {
    let settings = localStorage.getItem("dtdl_editor:setings:baseDtmi");    
    return settings;
  }
}
