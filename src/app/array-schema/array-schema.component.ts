import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArraySchemaFormControl } from '../formControls/ArraySchemaFormControl';
import { ArraySchemaCapbilityModel } from '../models/ArraySchemaCapbilityModel';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { EditorService } from '../services/editor/editor-service.service';
import { SchemaService } from '../services/schema/schema.service';
import { ValidationService } from '../services/validation/validation-service.service';

@Component({
  selector: 'app-array-schema',
  templateUrl: './array-schema.component.html',
  styleUrls: ['./array-schema.component.scss']
})
export class ArraySchemaComponent implements OnInit {
  public schema!: ArraySchemaFormControl;
  public schemaService: SchemaService;
  public editorService: EditorService;
  public panelOpenState = true;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;
  public dialog: MatDialog;
  private _dialogRef: MatDialogRef<ArraySchemaComponent>;
  public schemaTypes: Map<string, ICapabilityModel>;

  constructor(editorSerivce: EditorService, schemaService: SchemaService,
    formBuilder: FormBuilder, 
    validationService: ValidationService, 
    dialog: MatDialog,
    dialogRef: MatDialogRef<ArraySchemaComponent>, 
    @Inject(MAT_DIALOG_DATA) data: ArraySchemaCapbilityModel
  ) { 
    this.editorService = editorSerivce;
    this.schemaService = schemaService;
    this._formBuilder = formBuilder;
    this._validationService = validationService;
    this.dialog = dialog;
    this._dialogRef = dialogRef;
    this.schema = new ArraySchemaFormControl(data, this._formBuilder, this._validationService);
    this.schemaTypes = this.editorService.getSchemaTypes();
  }

  public ngOnInit(): void { 
    this.schema.subscribeModelToForm();
  }
}
