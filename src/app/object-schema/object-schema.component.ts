import { Component, OnInit, Input } from '@angular/core';
import { ObjectSchemaFormControl } from '../formControls/ObjectSchemaFormControl';
import { EditorService } from '../services/editor/editor-service.service';
import { ObjectSchemaEditorService } from '../services/object-schema-editor/object-schema-editor.service';

@Component({
  selector: 'object-schema',
  templateUrl: './object-schema.component.html',
  styleUrls: ['./object-schema.component.scss']
})
export class ObjectSchemaComponent implements OnInit {
  @Input() public field!: ObjectSchemaFormControl;
  public schemaObjectEditorService: ObjectSchemaEditorService; 
  public editorService: EditorService;
  public panelOpenState = true;
  private maxLevel: number = 5; 

  constructor(schemaObjectEditorService: ObjectSchemaEditorService, editorSerivce: EditorService) { 
    this.schemaObjectEditorService = schemaObjectEditorService; 
    this.editorService = editorSerivce;
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
}
