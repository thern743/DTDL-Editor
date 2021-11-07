import { Component, OnInit, Input } from '@angular/core';
import { ObjectSchemaFormControl } from '../formControls/ObjectSchemaFormControl';
import { ObjectSchemaEditorService } from '../services/object-schema-editor/object-schema-editor.service';

@Component({
  selector: 'object-schema',
  templateUrl: './object-schema.component.html',
  styleUrls: ['./object-schema.component.scss']
})
export class ObjectSchemaComponent implements OnInit {

  private maxLevel: number = 5; 
  @Input() public field!: ObjectSchemaFormControl;
  public schemaObjectEditorService: ObjectSchemaEditorService; 
  public panelOpenState = true;
  public schemaTypes : string[] = [
          "boolean",
          "date",
          "dateTime",
          "double",
          "duration",
          "float",
          "integer",
          "long",
          "string",
          "time",
          "object",
          "enum",
          "array"];

  constructor(schemaObjectEditorService: ObjectSchemaEditorService) { 
    this.schemaObjectEditorService = schemaObjectEditorService; 
  }

  ngOnInit(): void {
    this.field.model.schema = "none"; 
    this.field.subscribeModelToForm();
  }

  public getFields() : Array<ObjectSchemaFormControl> { 
    return this.field.fields
  }

  public addChild() : void { 
    this.schemaObjectEditorService.addChildField(this.field)
  }

  //DTDL Allows a nesting of objects down to five levels... 
  //i.e. 4 children on the top level object. 
  public canAddChild(): boolean { 
    return this.field.model.level > this.maxLevel - 1; 
  }

  public valSelected(val: string) : void { 
    this.field.model.schema = val; 
  }

  public isObjectSchema() : boolean { 
    return this.field.model.schema === "object"; 
  }
}
