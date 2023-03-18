import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JsonTypes, TypedJSON } from 'typedjson';
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';
import { InterfaceCapabilityModel } from '../models/InterfaceCapabilityModel';
import { IDtdlValidationResult } from '../models/interfaces/IDtdlValidationResult';
import { FileService } from '../services/file/file-service.service';
import { ValidationService } from '../services/validation/validation-service.service';

@Component({
  selector: 'preview-panel',
  templateUrl: './preview-panel.component.html',
  styleUrls: ['./preview-panel.component.scss']
})
export class PreviewPanelComponent implements OnInit {
  public panelOpenState = false;
  public interfaces!: Array<InterfaceCapabilityFormControl>;
  private _fileService: FileService;
  private _validationService: ValidationService;
  public validationResults!: IDtdlValidationResult[];

  constructor(fileService: FileService, validationService: ValidationService, @Inject(MAT_DIALOG_DATA) data: Array<InterfaceCapabilityFormControl>) {
    this._fileService = fileService;
    this._validationService = validationService;
    this.interfaces = data;
  }

  public ngOnInit(): void {

  }

  // TODO: TypedJSON is breaking when rendering JSON-LD output
  //       Using TypedJSON is causing "circular reference" errors and so we're relying on
  //       built-in JSON.stringify()/parse() for now. This may be okay but we should
  //       investigate why it's breaking so we can remain consistent between importing and exporting behavior.
  public getJsonLd(): any {
    const interfaces = this.interfaces.map((formControl: InterfaceCapabilityFormControl) => formControl.model);
    let str = JSON.stringify(interfaces);
    let result = JSON.parse(str);
    return result;
  }

  public saveFile(data: any): void {
    this._fileService.saveFile(data);
  }

  public validateModel(data: any): void {
    let models = new Array<any>(data);
    this._validationService.validateModel(models).subscribe({
      next: (results: IDtdlValidationResult[]) => {
        if (results.length)
          this.validationResults = results;
        else
          this.validationResults = new Array<IDtdlValidationResult>();
      },
      complete: () => {

      },
      error: (error: Error) => {

      }
    });
  }
}
