import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { ErrorSnackbarComponent } from '../../error-snackbar/error-snackbar.component';
import { InterfaceCapabilityModel } from '../../models/InterfaceCapabilityModel';
import * as FileSaver from 'file-saver';
import { ModelData } from 'src/app/models/ModelData';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public fileAttr = 'Choose Files...';
  public interfaceFiles: Array<ModelData>;
  private _interfaceFiles$: Subject<Array<ModelData>>;
  private _interfaces$: Subject<InterfaceCapabilityModel>;
  private _fileData$: Subject<string>;
  private _snackBar: MatSnackBar;

  constructor(snackBar: MatSnackBar) {
    this._snackBar = snackBar;
    this.interfaceFiles = new Array<ModelData>();
    this._interfaceFiles$ = new Subject<Array<ModelData>>();
    this._interfaces$ = new Subject<InterfaceCapabilityModel>();
    this._fileData$ = new Subject<string>();
  }

  private parseInternal = (file: any, model: any) => {
    const modelData = new ModelData();
    modelData.id = uuidv4();
    modelData.sortOrder = 1;
    modelData.data = file;

    this.addFile(modelData, model);
  }

  public importFiles(file: any): Subject<InterfaceCapabilityModel> {
    if (file.target.files && file.target.files.length > 0) {
      this.fileAttr = "";

      [...file.target.files].forEach((file: File) => {
        const reader = new FileReader();

        reader.onload = (data: any) => {
          const file = data.target.result;
          this.parseFileData(file);
        };

        reader.readAsText(file);
        this.fileAttr += file.name + ", ";
      });
    } else {
      this.fileAttr = "Choose Files...";
    }

    return this._interfaces$;
  }

  public parseFileData(file: any) {
    try {
      const models = JSON.parse(file);

      if (models instanceof Array) {
        models?.forEach((model: any) => {
          this.parseInternal(file, model);
        });
      } else {
        this.parseInternal(file, models);
      }

      this._interfaceFiles$.next(this.interfaceFiles);
    } catch (error) {
      const msg = "Invalid DTDL (JSON-LD) File";
      console.error(`${msg}:${error}`);

      // TODO: Use common ErrorService to control error SnackBar (FileService)
      //       Several services currently call `snackBar.openFromComponent(ErrorSnackbarComponent)`
      //       but should be calling through to an ErrorService which will do these common operations.
      this._snackBar.openFromComponent(ErrorSnackbarComponent, {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-warn'],
        data: { msg: msg }
      });

      this.fileAttr = "Choose Files...";
    }
  }

  public addFile(modelData: ModelData, model: any): void {
    model instanceof InterfaceCapabilityModel;
    this.interfaceFiles.push(modelData);
    this._interfaces$.next(model);
  }

  public copyFile(file: any): Subject<any> {
    if (file.target.files && file.target.files.length > 0) {
      this.fileAttr = "";

      [...file.target.files].forEach((file: File) => {
        let reader = new FileReader();

        reader.onload = (data: any) => {
          try {
            const file = data.target.result;
            const models = JSON.parse(file);

            if (models instanceof Array) {
              models?.forEach((model: any) => {
                this._fileData$.next(model);
              });
            } else {
              this._fileData$.next(models);
            }
          } catch (error) {
            const msg = "Could not parse file contents.";
            console.error(msg + ": " + error);

            this._snackBar.openFromComponent(ErrorSnackbarComponent, {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 5000,
              panelClass: ['mat-toolbar', 'mat-warn'],
              data: { msg: msg }
            });

            this.fileAttr = "Choose Files...";
          }
        };

        reader.readAsText(file);
        this.fileAttr += file.name + ", ";
      });
    } else {
      this.fileAttr = "Choose Files...";
    }

    return this._fileData$;
  }

  public get interfaceFiles$(): Subject<Array<ModelData>> {
    return this._interfaceFiles$;
  }

  public saveFile(jsonLd: string): void {
    var blob = new Blob([jsonLd], { type: "application/ld+json;charset=utf-8" });
    // TODO: Filename when saving JSON is hard-coded
    //       The current JSON filename is `digitalTwin.json`. We should allow the user
    //       to choose the name of the file to use.  
    FileSaver.saveAs(blob, "digitalTwin.json");
  }
}
