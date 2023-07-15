import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DateSchemaCapabilityModel } from '../../models/schemas/DateSchemaCapabilityModel';
import { ValidationService } from '../../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from '../AbstractCapabilityFormControl';

export class DateSchemaFormControl extends AbstractCapabilityFormControl<DateSchemaCapabilityModel> {
  private _validationService: ValidationService;
  public dialog: MatDialog;

  constructor(model: DateSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) {
    super(formBuilder);
    this._validationService = validationService;
    this.dialog = dialog;
    this.model = model;
    this.form = this.toFormGroup(model);
  }

  public toFormGroup(model: DateSchemaCapabilityModel): UntypedFormGroup {
    let form = this.formBuilder.group({
      "@id": [model["@id"], [this._validationService.validDtmi()]],
      "@type": [model["@type"]],
      displayName: [model.displayName],
      comment: [model.comment],
      description: [model.description]
    });

    return form;
  }
}