import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFormFactoryMethod } from '../../reflection/ReflectionMetadata';
import { PrimitiveSchemaCapabilityModel } from '../../models/schemas/PrimitiveSchemaCapabilityModel';
import { ValidationService } from '../../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from '../AbstractCapabilityFormControl';

export class PrimitiveSchemaFormControl extends AbstractCapabilityFormControl<PrimitiveSchemaCapabilityModel> {
  private _validationService: ValidationService;
  public dialog: MatDialog;

  constructor(model: PrimitiveSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
    super(formBuilder);
    this._validationService = validationService;
    this.dialog = dialog;
    this.model = model;
    this.form = this.toFormGroup(model);
  }

  public toFormGroup(model: PrimitiveSchemaCapabilityModel): FormGroup {
    let form = this.formBuilder.group({
      id: [model.id, [this._validationService.validDtmi()]],
      displayName: [model.displayName],
      comment: [model.comment],
      description: [model.description],
      // Primitive specific
      schema: [model.schema]
    });

    return form;
  }
}