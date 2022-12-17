import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnumSchemaFormControl } from '../formControls/EnumSchemaFormControl';
import { EditorService } from '../services/editor/editor-service.service';
import { SchemaService } from '../services/schema/schema.service';

@Component({
  selector: 'enum-schema',
  templateUrl: './enum-schema.component.html',
  styleUrls: ['./enum-schema.component.scss']
})
export class EnumSchemaComponent implements OnInit {
  public enum!: EnumSchemaFormControl;
  public schemaService: SchemaService;
  public editorService: EditorService;
  public panelOpenState = true;
  public dialog: MatDialog;

  constructor(editorSerivce: EditorService, schemaService: SchemaService,
    dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: EnumSchemaFormControl
  ) { 
    this.editorService = editorSerivce;
    this.schemaService = schemaService;
    this.dialog = dialog;
    this.enum = data;
  }

  public ngOnInit(): void { 
    this.enum.subscribeModelToForm();
  }

  public addValue(): void {
    
  }
}

