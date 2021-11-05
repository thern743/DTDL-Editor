import { Injectable } from '@angular/core';
import { ObjectSchemaFormControl } from 'src/app/formControls/ObjectSchemaFormControl';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SchemaObjectEditorServiceService {
  public objectSchemaFormControl: ObjectSchemaFormControl;

  constructor(formBuilder: FormBuilder) { 
    this.objectSchemaFormControl = new ObjectSchemaFormControl(formBuilder);
  }

  public addObjectSchemaField(objectSchemaFormControl: ObjectSchemaFormControl) { 
      let ObjectSchemaFormControl
  }

}
