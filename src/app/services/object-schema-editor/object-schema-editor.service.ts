import { Injectable } from '@angular/core';
import { ObjectSchemaFormControl } from 'src/app/formControls/ObjectSchemaFormControl';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectSchemaEditorService {
  public fields: ObjectSchemaFormControl[];
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
}
