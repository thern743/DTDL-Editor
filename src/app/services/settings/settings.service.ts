import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarComponent } from '../../error-snackbar/error-snackbar.component';
import { EditorSettings } from '../../models/EditorSettings';
import { SuccessSnackbarComponent } from '../../success-snackbar/success-snackbar.component';
import { FileService } from '../file/file.service';
import { FileData } from 'src/app/models/FileData';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public static EDITOR_SETTINGS: string = "dtdlEditor://settings";
  public static MODEL_FILES: string = "dtdlEditor://files";
  private _fileService: FileService;
  private _snackBar: MatSnackBar;
  public editorSettings!: EditorSettings;

  constructor(fileService: FileService, snackBar: MatSnackBar) {
    this._fileService = fileService;
    this._snackBar = snackBar;
    this.subscribeToFiles();
    this.editorSettings = this.loadSettings();
  }

  public save(editorSettings: EditorSettings): void {
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

  private loadSettings(): EditorSettings {
    let settings = localStorage.getItem(SettingsService.EDITOR_SETTINGS) ?? JSON.stringify(new EditorSettings());

    try {
      const existing: EditorSettings = JSON.parse(settings);
      const editorSettings = EditorSettings.fromExisting(existing);
      return editorSettings;
    } catch (error) {
      console.error("Could not load editor settings from local storage: %o", error);
    }

    return new EditorSettings();
  }

  private subscribeToFiles(): void {
    this._fileService.files$.subscribe((files: Array<FileData>) => {
      const fileData = JSON.stringify(files);
      localStorage.setItem(SettingsService.MODEL_FILES, fileData);
    });
  }

  public buildDtmi(name: string): string {
    let fullPath = "";

    this.editorSettings.path.forEach((text: string) => {
      fullPath = `${fullPath}:${text}`;
    });

    return `${this.editorSettings.scheme}${fullPath}:${name};${this.editorSettings.version}`;
  }
}