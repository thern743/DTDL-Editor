import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FieldCapabilityFormControl } from '../formControls/FieldCapabilityFormControl';
import { FieldCapabilityModel } from '../models/FieldCapabilityModel';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { ObjectSchemaComponent } from '../object-schema/object-schema.component';
import { EditorService } from '../services/editor/editor-service.service';
import { SchemaService } from '../services/schema/schema.service';

@Component({
  selector: 'field-definition',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() public formIndex!: number;
  @Input() public field!: FieldCapabilityFormControl;
  @Input() public panelOpenState = true;
  public objectSchemaService: SchemaService;
  public editorService: EditorService;
  public dialog: MatDialog; 

  public schemaTypes: Map<string, ICapabilityModel>;

  constructor(objectSchemaEditorService: SchemaService, editorSerivce: EditorService, dialog: MatDialog) { 
    this.objectSchemaService = objectSchemaEditorService; 
    this.editorService = editorSerivce;
    this.dialog = dialog;
    this.schemaTypes = this.editorService.getSchemaTypes();
  }

  public ngOnInit(): void {
    this.field.subscribeModelToForm();
  }
}