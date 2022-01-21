import { Injectable } from '@angular/core';
import { ObjectSchemaFormControl } from 'src/app/formControls/ObjectSchemaFormControl';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ObjectSchemaModel } from 'src/app/models/ObjectSchemaModel';
import { ValidationService } from '../validation/validation-service.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectSchemaEditorService {
  public fields: Array<ObjectSchemaFormControl>
  public fields$: Subject<ObjectSchemaFormControl>
  private _formBuilder: FormBuilder
  private _validationService: ValidationService

  constructor(formBuilder: FormBuilder, validationSerivce: ValidationService) {
    this._formBuilder = formBuilder
    this.fields = new Array<ObjectSchemaFormControl>()
    this.fields$ = new Subject<ObjectSchemaFormControl>()
    this._validationService = validationSerivce;
   }

  public addField(interfaceInstance: ObjectSchemaFormControl): void { 
    this.fields.push(interfaceInstance)
    this.fields$.next(interfaceInstance)
  }

  public addChildField(instance: ObjectSchemaFormControl): void { 
    let objectSchemaModel = new ObjectSchemaModel("temp", instance.model.level + 1)
    let objectSchemaChild = new ObjectSchemaFormControl(objectSchemaModel, this._formBuilder, this._validationService)
    instance.fields.push(objectSchemaChild)
  }

  public isObjectSchema(schema: String) : boolean { 
    return schema === "object"; 
  }
}
