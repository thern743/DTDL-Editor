import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarComponent } from 'src/app/error-snackbar/error-snackbar.component';
import { EditorSettings, EditorSettingsDto } from 'src/app/models/EditorSettings';
import { SuccessSnackbarComponent } from 'src/app/success-snackbar/success-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private static EDITOR_SETTINGS: string = "dtdlEditor://settings";
  private _snackBar: MatSnackBar;
  public editorSettings!: EditorSettings;

  constructor(snackBar: MatSnackBar) {
    this._snackBar = snackBar;    
    this.load();
  }

  public save(editorSettings: EditorSettingsDto): void {
    try {
      let settings = JSON.stringify(editorSettings);
      localStorage.setItem(SettingsService.EDITOR_SETTINGS, settings);
    } catch (err: any) {
      // TODO: Use common ErrorService to control error SnackBar (SettingsService)
      //       Several services currently call `snackBar.openFromComponent(ErrorSnackbarComponent)`
      //       but should be calling through to an ErrorService which will do these common operations.
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

  public load(): EditorSettingsDto {
    let settings = localStorage.getItem(SettingsService.EDITOR_SETTINGS) ?? JSON.stringify(new EditorSettings());

    try {
      let dto: EditorSettingsDto = JSON.parse(settings);
      this.editorSettings = EditorSettings.fromDto(dto);      
    } catch (error) {
      console.error("Could not load editor settings from local storage: %o", error);
    }

    return this.editorSettings;
  }

  public buildDtmi(name: string): string {
    let fullPath = "";

    this.editorSettings.path.forEach((text: string) => {
      fullPath = `${fullPath}:${text}`;
    });

    return `${this.editorSettings.scheme}${fullPath}:${name};${this.editorSettings.version}`;
  }
}