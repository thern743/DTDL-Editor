import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFormFactoryMethod } from '../../reflection/ReflectionMetadata';
import { TimeSchemaCapabilityModel } from '../../models/schemas/TimeSchemaCapabilityModel';
import { ValidationService } from '../../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from '../AbstractCapabilityFormControl';

export class TimeSchemaFormControl extends AbstractCapabilityFormControl<TimeSchemaCapabilityModel> {
  private _validationService: ValidationService;
  public dialog: MatDialog;

  constructor(model: TimeSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
    super(formBuilder);
    this._validationService = validationService;
    this.dialog = dialog;
    this.model = model;
    this.form = this.toFormGroup(model);
  }

  public toFormGroup(model: TimeSchemaCapabilityModel): FormGroup {
    let form = this.formBuilder.group({
      id: [model.id, [this._validationService.validDtmi()]],
      displayName: [model.displayName],
      comment: [model.comment],
      description: [model.description]
    });

    return form;
  }
}