import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FieldCapabilityFormControl } from '../formControls/FieldCapabilityFormControl';
import { FieldCapabilityModel } from '../models/FieldCapabilityModel';
import { ObjectSchemaComponent } from '../object-schema/object-schema.component';
import { EditorService } from '../services/editor/editor-service.service';
import { ObjectSchemaService } from '../services/object-schema/object-schema.service';

@Component({
  selector: 'field-definition',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() public formIndex!: number;
  @Input() public field!: FieldCapabilityFormControl;
  @Input() public panelOpenState = true;
  public objectSchemaService: ObjectSchemaService;
  public editorService: EditorService;
  public dialog: MatDialog;  

  constructor(objectSchemaEditorService: ObjectSchemaService, editorSerivce: EditorService, dialog: MatDialog) { 
    this.objectSchemaService = objectSchemaEditorService; 
    this.editorService = editorSerivce;
    this.dialog = dialog;
  }

  public ngOnInit(): void {
    this.field.subscribeModelToForm();
  }
}