import { FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AbstractSchemaModel } from '../../models/AbstractSchemaModel';
import { MapSchemaCapabilityModel } from '../../models/schemas/MapSchemaCapabilityModel';
import { ValidationService } from '../../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from '../AbstractCapabilityFormControl';
import { MapKeyFormControl } from '../MapKeyFormControl';
import { MapValueFormControl } from '../MapValueFormControl';
import { MapKeyCapabilityModel } from 'src/app/models/MapKeyCapabilityModel';
import { MapValueCapabilityModel } from 'src/app/models/MapValueCapabilityModel';

export class MapSchemaFormControl extends AbstractCapabilityFormControl<MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>> {
  private _validationService: ValidationService;
  public dialog: MatDialog;
  public mapKey!: MapKeyFormControl;
  public mapValue!: MapValueFormControl;

  constructor(model: MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>, validationService: ValidationService, formBuilder: UntypedFormBuilder, dialog: MatDialog) {
    super(formBuilder);
    this._validationService = validationService;
    this.dialog = dialog;
    this.model = model;
    this.form = this.toFormGroup(model);
  }

  public toFormGroup(model: MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>): UntypedFormGroup {
    let form = this.formBuilder.group({
      "@id": [model["@id"], [this._validationService.validDtmi()]],
      "@type": [model["@type"]],
      displayName: [model.displayName],
      comment: [model.comment],
      description: [model.description],
      // Map specific
      mapKey: this.getMapKeyFormGroup(model.mapKey),
      mapValue: this.getMapValueFormGroup(model.mapValue)
    });

    return form;
  }

  private getMapKeyFormGroup(mapKey: MapKeyCapabilityModel<AbstractSchemaModel>): FormGroup {
    const formGroup = this.mapKey?.toFormGroup(mapKey);
    return formGroup;
  }

  private getMapValueFormGroup(mapValue: MapValueCapabilityModel<AbstractSchemaModel>): FormGroup {
    const formGroup = this.mapValue?.toFormGroup(mapValue);
    return formGroup;
  }
}