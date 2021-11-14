import { Component, OnInit } from '@angular/core';
import { ObjectSchemaEditorService } from '../services/object-schema-editor/object-schema-editor.service';
import { FormBuilder } from '@angular/forms';
import { ObjectSchemaModel } from '../models/ObjectSchemaModel';
import { ObjectSchemaFormControl } from '../formControls/ObjectSchemaFormControl';
import { ValidationService } from '../services/validation/validation-service.service';

@Component({
  selector: 'object-schema-editor',
  templateUrl: './object-schema-editor.component.html',
  styleUrls: ['./object-schema-editor.component.scss']
})
export class ObjectSchemaEditorComponent implements OnInit {
  public objectSchemaEditorService: ObjectSchemaEditorService;
  public panelOpenState = true;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;

  constructor(
    objectSchemaEditorService: ObjectSchemaEditorService, 
    formBuilder: FormBuilder, 
    validationService: ValidationService) { 
    this.objectSchemaEditorService = objectSchemaEditorService; 
    this._formBuilder = formBuilder; 
    this._validationService = validationService;

    let model = new ObjectSchemaModel("default", 0);
    let interfaceInstance = new ObjectSchemaFormControl(model, this._formBuilder, this._validationService);
    this.objectSchemaEditorService.addField(interfaceInstance);
  }

  ngOnInit(): void {
  }

  public addField() {
    let objectSchema = new ObjectSchemaModel("new object schema", 0); 
    let objectSchemaInstance = new ObjectSchemaFormControl(objectSchema, this._formBuilder, this._validationService);
    this.objectSchemaEditorService.addField(objectSchemaInstance);
  }
}
