import { Injectable } from '@angular/core';
import { ObjectSchemaFormControl } from 'src/app/formControls/ObjectSchemaFormControl';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ObjectSchemaModel } from 'src/app/models/ObjectSchemaModel';

@Injectable({
  providedIn: 'root'
})
export class ObjectSchemaEditorService {
  public fields: Array<ObjectSchemaFormControl>;
  public fields$: Subject<ObjectSchemaFormControl>;
  private _formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder) {
    this._formBuilder = formBuilder; 
    this.fields = new Array<ObjectSchemaFormControl>();
    this.fields$ = new Subject<ObjectSchemaFormControl>();
   }

  public addField(interfaceInstance: ObjectSchemaFormControl): void { 
    this.fields.push(interfaceInstance);
    this.fields$.next(interfaceInstance);
  }

  public addChildField(instance: ObjectSchemaFormControl): void { 
    let objectSchemaModel = new ObjectSchemaModel("temp", instance.model.level + 1)
    let objectSchemaChild = new ObjectSchemaFormControl(objectSchemaModel, this._formBuilder)
    instance.fields.push(objectSchemaChild)
  }
}
