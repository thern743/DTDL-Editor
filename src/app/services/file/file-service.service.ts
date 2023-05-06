import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { ErrorSnackbarComponent } from '../../error-snackbar/error-snackbar.component';
import { InterfaceCapabilityModel } from '../../models/InterfaceCapabilityModel';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public fileAttr = 'Choose Files...';
  public files: File[];
  public interfaces$: Subject<InterfaceCapabilityModel>;
  public fileData$: Subject<any>;
  private _snackBar: MatSnackBar;

  constructor(snackBar: MatSnackBar) {
    this._snackBar = snackBar;
    this.files = new Array<File>();
    this.interfaces$ = new Subject<InterfaceCapabilityModel>();
    this.fileData$ = new Subject<any>();
  }

  public importFiles(file: any): Subject<InterfaceCapabilityModel> {
    if (file.target.files && file.target.files.length > 0) {
      this.fileAttr = "";

      const parseInternal = (capability: any) => {
        capability instanceof InterfaceCapabilityModel;
        this.files.push(file);
        this.interfaces$.next(capability);
      };

      [...file.target.files].map((file: File) => {
        const reader = new FileReader();
        reader.onload = (data: any) => {
          const file = data.target.result;
          const fileString = file as string;

          console.debug("Reading File: %s ...", fileString.substring(0, 25));

          try {
            const capabilities = JSON.parse(file);

            if (capabilities instanceof Array) {
              capabilities?.forEach((capability: any) => {
                parseInternal(capability);
              });
            } else {
              parseInternal(capabilities);
            }
          } catch (error) {
            const msg = "Invalid DTDL (JSON-LD) File";
            console.error(msg + ": " + error);

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
        };

        reader.readAsText(file);
        this.fileAttr += file.name + ", ";
      });
    } else {
      this.fileAttr = "Choose Files...";
    }

    return this.interfaces$;
  }

  public copyFile(file: any): Subject<any> {
    if (file.target.files && file.target.files.length > 0) {
      this.fileAttr = "";

      [...file.target.files].map((file: File) => {
        let reader = new FileReader();
        reader.onload = (data: any) => {
          let file = data.target.result;

          console.debug("Reading File: %s ...", (<string>file).substring(0, 25));

          try {
            let data = JSON.parse(file);
            this.files.push(file);
            this.fileData$.next(data);
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

    return this.fileData$;
  }

  public saveFile(jsonLd: string): void {
    var blob = new Blob([jsonLd], { type: "application/ld+json;charset=utf-8" });
    // TODO: Filename when saving JSON is hard-coded
    //       The current JSON filename is `digitalTwin.json`. We should allow the user
    //       to choose the name of the file to use.  
    FileSaver.saveAs(blob, "digitalTwin.json");
  }
}
