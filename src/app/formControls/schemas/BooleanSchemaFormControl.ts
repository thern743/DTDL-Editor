import { RegisterFormFactoryMethod } from '../../reflection/ReflectionMetadata'
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BooleanSchemaCapabilityModel } from '../../models/schemas/BooleanSchemaCapabilityModel';
import { ValidationService } from '../../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from '../AbstractCapabilityFormControl';
import { Injectable } from '@angular/core';

@Injectable()
export class BooleanSchemaFormControl extends AbstractCapabilityFormControl<BooleanSchemaCapabilityModel> {
  private _validationService: ValidationService;
  public dialog: MatDialog;

  constructor(model: BooleanSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
    super(formBuilder);
    this.dialog = dialog;
    this._validationService = validationService;
    this.model = model;
    this.form = this.toFormGroup(model);
  }

  public toFormGroup(model: BooleanSchemaCapabilityModel): FormGroup {
    let form = this.formBuilder.group({
      id: [model.id, [this._validationService.validDtmi()]],
      displayName: [model.displayName],
      comment: [model.comment],
      description: [model.description]
    });

    return form;
  }
}