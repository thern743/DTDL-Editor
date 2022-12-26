import { Component, OnInit } from '@angular/core';
import { IDtdlValidationResult } from '../models/IDtdlValidationResult';
import { ValidationService } from '../services/validation/validation-service.service';

@Component({
  selector: 'model-validation',
  templateUrl: './model-validation.component.html',
  styleUrls: ['./model-validation.component.scss']
})
export class ModelValidationComponent implements OnInit {
  private _validationService: ValidationService;
  public validationResults!: IDtdlValidationResult[];

  constructor(validationService: ValidationService) { 
    this._validationService = validationService;
  }

  public ngOnInit(): void {
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
