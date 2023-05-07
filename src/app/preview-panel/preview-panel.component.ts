import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';
import { IDtdlValidationResult } from '../models/interfaces/IDtdlValidationResult';
import { FileService } from '../services/file/file.service';
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
  public editMode: boolean;

  constructor(fileService: FileService, validationService: ValidationService, @Inject(MAT_DIALOG_DATA) data: Array<InterfaceCapabilityFormControl>) {
    this._fileService = fileService;
    this._validationService = validationService;
    this.interfaces = data;
    this.editMode = false;
  }

  public ngOnInit(): void {

  }

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

  public toggleEditMode(): void {
    this.editMode = !this.editMode; 
  }
}
