import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarComponent } from 'src/app/error-snackbar/error-snackbar.component';
import { InterfaceCapability } from 'src/app/models/InterfaceCapability';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  fileAttr = 'Choose Files...';
  files: File[];
  interfaces: InterfaceCapability[];

  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) { 
    this.files = new Array<File>(); 
    this.interfaces = new Array<InterfaceCapability>();
  }

  public uploadFiles(file: any) {
    if (file.target.files && file.target.files.length > 0) {
      this.fileAttr = "";
      
      [...file.target.files].map((file: File) => {                
        let reader = new FileReader();

        reader.onload = (data: any) => {
          let file = data.target.result;
          console.log("Reading File: \n\n" + file);

          try {            
            let capability = JSON.parse(file) as InterfaceCapability;
            capability.formBuilder = this._formBuilder;

            this.files.push(file);
            this.interfaces.push(capability);                                    
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
  }
}
