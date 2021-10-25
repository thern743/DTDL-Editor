import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { ErrorSnackbarComponent } from 'src/app/error-snackbar/error-snackbar.component';
import { InterfaceCapabilityModel } from 'src/app/models/InterfaceCapabilityModel';
import { TypedJSON } from 'typedjson';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public fileAttr = 'Choose Files...';
  public files: File[];
  public interfaces$: Subject<InterfaceCapabilityModel>;
  public typedJson: TypedJSON<InterfaceCapabilityModel>;  
  private _formBuilder: FormBuilder;

  private _snackBar: MatSnackBar

  constructor(formBuilder: FormBuilder, snackBar: MatSnackBar) { 
    this._formBuilder = formBuilder;
    this._snackBar = snackBar;
    this.files = new Array<File>(); 
    this.interfaces$ = new Subject<InterfaceCapabilityModel>();
    this.typedJson = new TypedJSON(InterfaceCapabilityModel);
  }

  public uploadFiles(file: any): Subject<InterfaceCapabilityModel> {
    if (file.target.files && file.target.files.length > 0) {
      this.fileAttr = "";
      
      [...file.target.files].map((file: File) => {                
        let reader = new FileReader();
        reader.onload = (data: any) => {
          let file = data.target.result;

          console.debug("Reading File: %s ...", (<string>file).substring(0, 25));
      
          try {
            let capability = this.typedJson.parse(file);
            capability instanceof InterfaceCapabilityModel;
            this.files.push(file);      
            this.interfaces$.next(capability);                                    
          } catch(error) {
            const msg = "Invalid DTDL (JSON-LD) File";
            console.error(msg + ": " + error); 
      
            // TODO: Handle in a new ErrorService
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
}
