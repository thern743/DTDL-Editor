import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFormFactoryMethod } from '../../reflection/ReflectionMetadata';
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

  constructor(model: MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
    super(formBuilder);
    this._validationService = validationService;
    this.dialog = dialog;
    this.mapModelSubProperties(model);
    this.model = model;
    this.form = this.toFormGroup();
  }

  private mapModelSubProperties(model: MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>): void {
    // NO OP     
  }

  public setMapKeyForm(form: MapKeyFormControl): void {
    this.mapKey = form;
    this.model.setKey(this.mapKey.model);
  }

  public setMapValueForm(form: MapValueFormControl): void {
    this.mapValue = form;
    this.model.setValue(this.mapValue.model);
  }

  public toFormGroup(): FormGroup {
    let form = this.formBuilder.group({
      id: [this.model.id, [this._validationService.validDtmi()]],
      displayName: [this.model.displayName],
      comment: [this.model.comment],
      description: [this.model.description],
      // Map specific
      mapKey: this.formBuilder.group({ name: [], schema: [] }), //[]
      mapValue: this.formBuilder.group({ name: [], schema: [] }) //[]
    });

    return form;
  }
}