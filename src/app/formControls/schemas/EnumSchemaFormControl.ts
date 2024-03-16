import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EnumSchemaCapabilityModel } from '../../models/schemas/EnumSchemaCapabilityModel';
import { EnumValueCapabilityModel } from '../../models/EnumValueCapabilityModel';
import { ValidationService } from '../../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from '../AbstractCapabilityFormControl';
import { EnumValueCapabilityFormControl } from '../EnumValueCapabilityFormControl';

export class EnumSchemaFormControl extends AbstractCapabilityFormControl<EnumSchemaCapabilityModel> {
  private _validationService: ValidationService;
  public dialog: MatDialog;
  public enumValues!: Array<EnumValueCapabilityFormControl>;

  constructor(model: EnumSchemaCapabilityModel, validationService: ValidationService, formBuilder: UntypedFormBuilder, dialog: MatDialog) {
    super(formBuilder);
    this._validationService = validationService;
    this.dialog = dialog;
    this.model = model;
    this.enumValues = this.mapModelSubProperties(model);
    this.form = this.toFormGroup(model);
  }

  private mapModelSubProperties(enumModel: EnumSchemaCapabilityModel): Array<EnumValueCapabilityFormControl> {
    let enumValues = new Array<EnumValueCapabilityFormControl>();

    enumModel.enumValues?.map((subModel: EnumValueCapabilityModel) => {
      enumValues.push(new EnumValueCapabilityFormControl(subModel, this.formBuilder, this._validationService, this.dialog));
    });

    return enumValues;
  }

  public toFormGroup(model: EnumSchemaCapabilityModel): UntypedFormGroup {
    let form = this.formBuilder.group({
      "@id": [model["@id"], [this._validationService.validDtmi()]],
      "@type": [model["@type"]],
      displayName: [model.displayName],
      comment: [model.comment],
      description: [model.description],
      // Enum specific
      valueSchema: [model.valueSchema],
      enumValues: this.formBuilder.array(this.enumValues)
    });

    return form;
  }
}