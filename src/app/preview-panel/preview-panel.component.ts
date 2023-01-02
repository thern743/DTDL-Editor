import { Component, Input, OnInit } from '@angular/core';
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
  @Input() public formIndex: number = 0;
  @Input() public interface!: InterfaceCapabilityFormControl;
  @Input('cdkCopyToClipboard') public text!: string
  private _fileService: FileService;
  private _validationService: ValidationService;
  private _typedJson: TypedJSON<InterfaceCapabilityModel>;
  public validationResults!: IDtdlValidationResult[];

  constructor(fileService: FileService, validationService: ValidationService) {
    this._fileService = fileService;
    this._validationService = validationService;
    this._typedJson = new TypedJSON(InterfaceCapabilityModel, { preserveNull: true });
  }

  public ngOnInit(): void {

  }

  // TODO: TypedJSON is breaking when rendering JSON-LD output
  //       Using TypedJSON is causing "circular reference" errors and so we're relying on
  //       built-in JSON.stringify()/parse() for now. This may be okay but we should
  //       investigate why it's breaking so we can remain consistent between importing and exporting behavior.
  public getJsonLd(): any {
    //let str = this._typedJson.stringify(this.interface.model);    
    //let result = this._typedJson.parse(str);
    let str = JSON.stringify(this.interface.model);
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
