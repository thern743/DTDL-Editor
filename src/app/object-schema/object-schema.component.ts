import { Component, OnInit, Input } from '@angular/core';
import { ObjectSchemaFormControl } from '../formControls/ObjectSchemaFormControl';
import { ObjectSchemaEditorService } from '../services/object-schema-editor/object-schema-editor.service';
import { ObjectSchemaModel } from '../models/ObjectSchemaModel';

@Component({
  selector: 'object-schema',
  templateUrl: './object-schema.component.html',
  styleUrls: ['./object-schema.component.scss']
})
export class ObjectSchemaComponent implements OnInit {
  @Input() public field!: ObjectSchemaFormControl;
  public schemaObjectEditorService: ObjectSchemaEditorService; 
  public panelOpenState = true;

  constructor(schemaObjectEditorService: ObjectSchemaEditorService) { 
    this.schemaObjectEditorService = schemaObjectEditorService; 
  }

  ngOnInit(): void {
  }

  public getFields() : Array<ObjectSchemaFormControl> { 
    return this.field.fields; 
  }
}
