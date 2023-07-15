import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FieldCapabilityModel } from '../../models/FieldCapabilityModel';
import { ObjectSchemaCapabilityModel } from '../../models/schemas/ObjectSchemaCapabilityModel';
import { ValidationService } from '../../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from '../AbstractCapabilityFormControl';
import { FieldCapabilityFormControl } from '../FieldCapabilityFormControl';

export class ObjectSchemaFormControl extends AbstractCapabilityFormControl<ObjectSchemaCapabilityModel> {
  private _validationService: ValidationService;
  public dialog: MatDialog;
  public fields!: Array<FieldCapabilityFormControl>;

  constructor(model: ObjectSchemaCapabilityModel, validationService: ValidationService, formBuilder: UntypedFormBuilder, dialog: MatDialog) {
    super(formBuilder);
    this._validationService = validationService;
    this.dialog = dialog;
    this.model = model;
    this.fields = this.mapModelSubProperties(model);
    this.form = this.toFormGroup(model);
  }

  private mapModelSubProperties(model: ObjectSchemaCapabilityModel): Array<FieldCapabilityFormControl> {
    let fields = new Array<FieldCapabilityFormControl>()

    model.fields?.map((model: FieldCapabilityModel) => {
      let formControl: FieldCapabilityFormControl = new FieldCapabilityFormControl(model, this.formBuilder, this._validationService);
      fields.push(formControl);
    });

    return fields;
  }

  public toFormGroup(model: ObjectSchemaCapabilityModel): UntypedFormGroup {
    let form = this.formBuilder.group({
      "@id": [model["@id"], [this._validationService.validDtmi()]],
      "@type": [model["@type"]],
      displayName: [model.displayName],
      comment: [model.comment],
      description: [model.description],
      // Object Schema Specific
      fields: this.formBuilder.array([...model.fields])
    });

    return form;
  }
}