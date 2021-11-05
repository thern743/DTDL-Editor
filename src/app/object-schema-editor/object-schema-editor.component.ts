import { Component, OnInit } from '@angular/core';
import { ObjectSchemaEditorService } from '../services/object-schema-editor/object-schema-editor.service';
import { FormBuilder } from '@angular/forms';
import { ObjectSchemaModel } from '../models/ObjectSchemaModel';
import { ObjectSchemaFormControl } from '../formControls/ObjectSchemaFormControl';

@Component({
  selector: 'object-schema-editor',
  templateUrl: './object-schema-editor.component.html',
  styleUrls: ['./object-schema-editor.component.scss']
})
export class ObjectSchemaEditorComponent implements OnInit {
  public objectSchemaEditorService: ObjectSchemaEditorService;
  private _formBuilder: FormBuilder;
  public panelOpenState = true;

  constructor(objectSchemaEditorService: ObjectSchemaEditorService, formBuilder: FormBuilder) { 
    this.objectSchemaEditorService = objectSchemaEditorService; 
    this._formBuilder = formBuilder; 

    let model = new ObjectSchemaModel("default", 0);
    let interfaceInstance = new ObjectSchemaFormControl(model, this._formBuilder);
    this.objectSchemaEditorService.addField(interfaceInstance);
  }

  ngOnInit(): void {
  }

  public addField() {
    //TODO: Add levels
    let objectSchema = new ObjectSchemaModel("new object schema", 0); 
    let objectSchemaInstance = new ObjectSchemaFormControl(objectSchema, this._formBuilder);
    this.objectSchemaEditorService.addField(objectSchemaInstance);
  }
}
