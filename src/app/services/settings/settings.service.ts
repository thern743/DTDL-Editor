import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarComponent } from 'src/app/error-snackbar/error-snackbar.component';
import { EditorSettings } from 'src/app/models/EditorSettings';
import { SuccessSnackbarComponent } from 'src/app/success-snackbar/success-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private static DTMI_SETTINGS: string = "dtdl_editor:settings:baseDtmi";
  public static DEFAULT_DTMI = "dtmi:com:dtdlEditor:default;1";
  private _snackBar: MatSnackBar;
  private _editorSettings!: EditorSettings;

  constructor(snackBar: MatSnackBar) {
    this._snackBar = snackBar;    
    this._editorSettings = new EditorSettings();
    this.load();
  }

  public save(settings: any): void {
    try {
      localStorage.setItem(SettingsService.DTMI_SETTINGS, settings);
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
      panelClass: ["mat-toolbar", "mat-accent"],
      data: { msg: "Settings saved." }
    });
  }

  public load(): EditorSettings {    
    this._editorSettings.BaseDtmi = localStorage.getItem(SettingsService.DTMI_SETTINGS) ?? SettingsService.DEFAULT_DTMI;    
    return this._editorSettings;
  }
}