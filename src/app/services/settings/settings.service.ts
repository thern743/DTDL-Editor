import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarComponent } from 'src/app/error-snackbar/error-snackbar.component';
import { EditorSettings } from 'src/app/models/EditorSettings';
import { SuccessSnackbarComponent } from 'src/app/success-snackbar/success-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private static EDITOR_SETTINGS: string = "dtdl_editor://settings";
  private _snackBar: MatSnackBar;
  private _editorSettings!: EditorSettings;

  constructor(snackBar: MatSnackBar) {
    this._snackBar = snackBar;    
    this._editorSettings = new EditorSettings();
    this.load();
  }

  public save(editorSettings: EditorSettings): void {
    try {
      let settings = JSON.stringify(editorSettings);
      localStorage.setItem(SettingsService.EDITOR_SETTINGS, settings);
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
    let settings = localStorage.getItem(SettingsService.EDITOR_SETTINGS) ?? JSON.stringify(new EditorSettings());

    try {
      let editorSettings: EditorSettings = JSON.parse(settings);
      this._editorSettings = editorSettings;      
    } catch (error) {
      console.error("Could not load editor settings from local storage: %o", error);
    }
    
    return this._editorSettings;
  }
}