import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AbstractSchemaModel } from '../../models/AbstractSchemaModel';
import { MapSchemaCapabilityModel } from '../../models/schemas/MapSchemaCapabilityModel';
import { ValidationService } from '../../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from '../AbstractCapabilityFormControl';
import { MapKeyFormControl } from '../MapKeyFormControl';
import { MapValueFormControl } from '../MapValueFormControl';

export class MapSchemaFormControl extends AbstractCapabilityFormControl<MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>> {
  private _validationService: ValidationService;
  public dialog: MatDialog;
  public mapKey!: MapKeyFormControl;
  public mapValue!: MapValueFormControl;

  constructor(model: MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>, validationService: ValidationService, formBuilder: FormBuilder, dialog: MatDialog) {
    super(formBuilder);
    this._validationService = validationService;
    this.dialog = dialog;
    this.model = model;
    this.form = this.toFormGroup(model);
  }

  public setMapKeyForm(form: MapKeyFormControl): void {
    this.mapKey = form;
    this.model.setKey(this.mapKey.model);
  }

  public setMapValueForm(form: MapValueFormControl): void {
    this.mapValue = form;
    this.model.setValue(this.mapValue.model);
  }

  public toFormGroup(model: MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>): FormGroup {
    let form = this.formBuilder.group({
      id: [model.id, [this._validationService.validDtmi()]],
      displayName: [model.displayName],
      comment: [model.comment],
      description: [model.description],
      // Map specific
      mapKey: this.formBuilder.group({ name: [], schema: [] }),
      mapValue: this.formBuilder.group({ name: [], schema: [] })
    });

    return form;
  }
}