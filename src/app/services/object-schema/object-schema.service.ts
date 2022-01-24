import { Injectable } from '@angular/core';
import { FieldCapabilityFormControl } from 'src/app/formControls/FieldCapabilityFormControl';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ValidationService } from '../validation/validation-service.service';
import { FieldCapabilityModel } from 'src/app/models/FieldCapabilityModel';
import { ICapabilityFormControl } from 'src/app/formControls/ICapabilityFormControl';
import { ICapabilityModel } from 'src/app/models/ICapabilityModel';
import { ObjectSchemaFormControl } from 'src/app/formControls/ObjectSchemaFormControl';
import { ObjectSchemaCapbilityModel } from 'src/app/models/ObjectSchemaCapbilityModel';

@Injectable({
  providedIn: 'root'
})
export class ObjectSchemaService {
  public fields$: Subject<FieldCapabilityFormControl>;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;

  constructor(formBuilder: FormBuilder, validationSerivce: ValidationService) {
    this._formBuilder = formBuilder;
    this.fields$ = new Subject<FieldCapabilityFormControl>();
    this._validationService = validationSerivce;
  }

  public getObjectSchemaFormControl(): ObjectSchemaFormControl {
    let model = new ObjectSchemaCapbilityModel("dtmi:com:example:MyObjectSchema;1");
    let form = new ObjectSchemaFormControl(model, this._formBuilder, this._validationService);
    return form;
  }

  public addFieldToObjectSchema(objectSchema: ObjectSchemaFormControl): void { 
    let field = new FieldCapabilityModel("dtmi:com:example:MyField;1"); 
    let form = new FieldCapabilityFormControl(field, this._formBuilder, this._validationService);
    objectSchema.fields.push(form);
    this.fields$.next(form);
  }

  public addChildField(objectSchema: ICapabilityFormControl<ICapabilityModel>): void {
    
  }

  public isObjectSchema(schema: ICapabilityModel) : boolean { 
    return schema?.type[0] === "Object"; 
  }
}
