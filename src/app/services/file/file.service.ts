import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { ErrorSnackbarComponent } from '../../error-snackbar/error-snackbar.component';
import { InterfaceCapabilityModel } from '../../models/InterfaceCapabilityModel';
import * as FileSaver from 'file-saver';
import { ModelData } from 'src/app/models/ModelData';
import { v4 as uuidv4 } from 'uuid';
import { FileData } from 'src/app/models/FileData';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public fileAttr = 'Choose Files...';
  private _modelData$: Subject<ModelData>;
  private _model$: Subject<InterfaceCapabilityModel>;
  private _file$: Subject<any>;
  private _files$: Subject<Array<FileData>>;
  public files: Array<FileData>;
  private _snackBar: MatSnackBar;

  constructor(snackBar: MatSnackBar) {
    this._snackBar = snackBar;
    this._modelData$ = new Subject<ModelData>();
    this._model$ = new Subject<InterfaceCapabilityModel>();
    this._file$ = new Subject<any>();
    this._files$ = new Subject<Array<FileData>>();
    this.files = new Array<FileData>();
  }

  private parseInternal = (rawFileData: any, model: any) => {
    const modelData = new ModelData();
    modelData.id = uuidv4();
    modelData.sortOrder = 1;
    modelData.data = rawFileData;

    this.addModel(modelData, model);
  }

  public importFiles(fileUpload: any): Subject<InterfaceCapabilityModel> {
    if (fileUpload.target.files && fileUpload.target.files.length > 0) {
      this.fileAttr = "";

      [...fileUpload.target.files].forEach((file: File) => {
        const reader = new FileReader();
        file.name

        reader.onload = (data: any) => {
          const rawFileData = data.target.result;
          this.parseRawFileData(file.name, rawFileData);
        };

        reader.readAsText(file);
        this.fileAttr += file.name + ", ";
      });
    } else {
      this.fileAttr = "Choose Files...";
    }

    return this._model$;
  }

  public parseRawFileData(filename: string, rawFileData: any) {
    try {
      const models = JSON.parse(rawFileData);

      if (models instanceof Array) {
        models?.forEach((model: any) => {
          this.parseInternal(rawFileData, model);
        });
      } else {
        this.parseInternal(rawFileData, models);
      }

      const fileData = new FileData();
      fileData.id = uuidv4();
      fileData.name = filename ?? "file.json";
      fileData.sortOrder = -1;
      fileData.data = rawFileData;

      this.addFile(fileData);
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

  public addFile(file: FileData): void {
    this.files.push(file);
    this._file$.next(file);
    this._files$.next(this.files);
  }

  public addModel(modelData: ModelData, model: any): void {
    model instanceof InterfaceCapabilityModel;
    this._modelData$.next(modelData);
    this._model$.next(model);
  }

  public copyFile(file: any): Subject<any> {
    if (file.target.files && file.target.files.length > 0) {
      this.fileAttr = "";

      [...file.target.files].forEach((file: File) => {
        let reader = new FileReader();

        reader.onload = (fileData: any) => {
          try {
            const rawFileData = fileData.target.result;
            const models = JSON.parse(rawFileData);

            if (models instanceof Array) {
              models?.forEach((model: any) => {
                this.parseInternal(rawFileData, model);
              });
            } else {
              this.parseInternal(rawFileData, models);
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

    return this._model$;
  }

  public get models$(): Subject<InterfaceCapabilityModel> {
    return this._model$;
  }

  public get files$(): Subject<Array<FileData>> {
    return this._files$;
  }

  public get file$(): Subject<FileData> {
    return this._file$;
  }

  public saveFile(jsonLd: string): void {
    var blob = new Blob([jsonLd], { type: "application/ld+json;charset=utf-8" });
    // TODO: Filename when saving JSON is hard-coded
    //       The current JSON filename is `digitalTwin.json`. We should allow the user
    //       to choose the name of the file to use.  
    FileSaver.saveAs(blob, "digitalTwin.json");
  }
}
