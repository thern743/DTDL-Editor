import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MapSchemaFormControl } from '../formControls/MapSchemaFormControl';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { MapSchemaCapbilityModel } from '../models/MapSchemaCapbilityModel';
import { EditorService } from '../services/editor/editor-service.service';
import { SchemaService } from '../services/schema/schema.service';
import { ValidationService } from '../services/validation/validation-service.service';

@Component({
  selector: 'app-map-schema',
  templateUrl: './map-schema.component.html',
  styleUrls: ['./map-schema.component.scss']
})
export class MapSchemaComponent implements OnInit {
  public schema!: MapSchemaFormControl;
  public schemaService: SchemaService;
  public editorService: EditorService;
  public panelOpenState = true;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;
  public dialog: MatDialog;
  private _dialogRef: MatDialogRef<MapSchemaComponent>;
  public schemaTypes: Map<string, ICapabilityModel>;

  constructor(editorSerivce: EditorService, schemaService: SchemaService,
    formBuilder: FormBuilder, 
    validationService: ValidationService, 
    dialog: MatDialog,
    dialogRef: MatDialogRef<MapSchemaComponent>, 
    @Inject(MAT_DIALOG_DATA) data: MapSchemaCapbilityModel
  ) { 
    this.editorService = editorSerivce;
    this.schemaService = schemaService;
    this._formBuilder = formBuilder;
    this._validationService = validationService;
    this.dialog = dialog;
    this._dialogRef = dialogRef;
    this.schema = new MapSchemaFormControl(data, this._formBuilder, this._validationService);
    this.schemaTypes = this.editorService.getSchemaTypes();
  }

  public ngOnInit(): void { 
    this.schema.subscribeModelToForm();
  }
}
