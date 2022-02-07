import { Injectable } from '@angular/core';
import { FieldCapabilityFormControl } from 'src/app/formControls/FieldCapabilityFormControl';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ValidationService } from '../validation/validation-service.service';
import { FieldCapabilityModel } from 'src/app/models/FieldCapabilityModel';
import { ObjectSchemaFormControl } from 'src/app/formControls/ObjectSchemaFormControl';
import { ObjectSchemaCapbilityModel } from 'src/app/models/ObjectSchemaCapbilityModel';
import { MatDialog } from '@angular/material/dialog';
import { AbstractCapabilityModel } from 'src/app/models/AbstractCapabilityModel';
import { ObjectSchemaComponent } from 'src/app/object-schema/object-schema.component';
import { ArraySchemaComponent } from 'src/app/array-schema/array-schema.component';
import { ArraySchemaCapbilityModel } from 'src/app/models/ArraySchemaCapbilityModel';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  public fields$: Subject<FieldCapabilityModel>;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;

  constructor(formBuilder: FormBuilder, validationSerivce: ValidationService) {
    this._formBuilder = formBuilder;
    this.fields$ = new Subject<FieldCapabilityModel>();
    this._validationService = validationSerivce;
  }

  public addFieldToObjectSchema(objectSchema: ObjectSchemaFormControl): void { 
    let model = new FieldCapabilityModel("dtmi:com:example:MyField;1"); 
    let form = new FieldCapabilityFormControl(model, this._formBuilder, this._validationService);
    objectSchema.fields.push(form);
    objectSchema.model.fields.push(model);
    this.fields$.next(model);
  }

  public openArraySchemaEditor(dialog: MatDialog, form: FormGroup) {
    var schema = form.controls.schema.value as ArraySchemaCapbilityModel;

    dialog.open(ArraySchemaComponent, { 
      data: schema
    })
    .afterClosed()
    .subscribe((result: ArraySchemaCapbilityModel) => {
      if (result) {
        form.controls.schema.setValue(result);
      } 
    });
  }

  public openObjectSchemaEditor(dialog: MatDialog, form: FormGroup) {
    var schema = form.controls.schema.value as ObjectSchemaCapbilityModel;

    dialog.open(ObjectSchemaComponent, { 
      data: schema
    })
    .afterClosed()
    .subscribe((result: ObjectSchemaCapbilityModel) => {
      if (result) {
        form.controls.schema.setValue(result);
      } 
    });
  }

  public isComplexSchema(form: FormGroup) {
    let type = form.get('schema')?.value?.type[0];
    return ["Array", "Enum", "Map", "Object"].indexOf(type) >= 0;
  }

  public compareSchemas(model1: AbstractCapabilityModel, model2: AbstractCapabilityModel): boolean {
    return model1 && model2 ? model1.type[0] === model2.type[0] : model1 === model2;
  }
}
