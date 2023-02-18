import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFormFactoryMethod } from '../../reflection/ReflectionMetadata';
import { FieldCapabilityModel } from '../../models/FieldCapabilityModel';
import { ObjectSchemaCapabilityModel } from '../../models/schemas/ObjectSchemaCapabilityModel';
import { ValidationService } from '../../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from '../AbstractCapabilityFormControl';
import { FieldCapabilityFormControl } from '../FieldCapabilityFormControl';

export class ObjectSchemaFormControl extends AbstractCapabilityFormControl<ObjectSchemaCapabilityModel> {
  private _validationService: ValidationService;
  public dialog: MatDialog;
  public fields!: Array<FieldCapabilityFormControl>;

  constructor(model: ObjectSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
    super(formBuilder);
    this._validationService = validationService;
    this.dialog = dialog;
    this.fields = new Array<FieldCapabilityFormControl>();
    this.mapModelSubProperties(model);
    this.model = model;
    this.form = this.toFormGroup();
  }

  private mapModelSubProperties(model: ObjectSchemaCapabilityModel): void {
    model.fields?.map((model: FieldCapabilityModel) => {
      let formControl: FieldCapabilityFormControl = new FieldCapabilityFormControl(model, this.formBuilder, this._validationService);
      this.fields.push(formControl);
    });
  }

  public toFormGroup(): FormGroup {
    let form = this.formBuilder.group({
      id: [this.model.id, [this._validationService.validDtmi()]],
      displayName: [this.model.displayName],
      comment: [this.model.comment],
      description: [this.model.description],
      // Object Schema Specific
      fields: this.formBuilder.array([...this.model.fields])
    });

    return form;
  }
}