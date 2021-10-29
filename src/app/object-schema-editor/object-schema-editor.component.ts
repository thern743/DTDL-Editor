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

    //TODO: If I add an object schema model it makes it so the entire window doesnt show
    let model = new ObjectSchemaModel("default");
    let interfaceInstance = new ObjectSchemaFormControl(model, this._formBuilder);
    this.objectSchemaEditorService.addField(interfaceInstance);
  }

  ngOnInit(): void {
  }

  public addField() {
    let objectSchema = new ObjectSchemaModel("new object schema"); 
    let objectSchemaInstance = new ObjectSchemaFormControl(objectSchema, this._formBuilder);
    this.objectSchemaEditorService.addField(objectSchemaInstance);
  }

}
