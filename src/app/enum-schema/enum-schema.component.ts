import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArraySchemaComponent } from '../array-schema/array-schema.component';
import { EnumSchemaFormControl } from '../formControls/EnumSchemaFormControl';
import { EnumSchemaCapbilityModel } from '../models/EnumSchemaCapbilityModel';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { EditorService } from '../services/editor/editor-service.service';
import { SchemaService } from '../services/schema/schema.service';
import { ValidationService } from '../services/validation/validation-service.service';

@Component({
  selector: 'app-enum-schema',
  templateUrl: './enum-schema.component.html',
  styleUrls: ['./enum-schema.component.scss']
})
export class EnumSchemaComponent implements OnInit {
  public enumSchema!: EnumSchemaFormControl;
  public schemaService: SchemaService;
  public editorService: EditorService;
  public panelOpenState = true;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;
  public dialog: MatDialog;
  private _dialogRef: MatDialogRef<EnumSchemaComponent>;
  public schemaTypes: Map<string, ICapabilityModel>;

  constructor(editorSerivce: EditorService, schemaService: SchemaService,
    formBuilder: FormBuilder, 
    validationService: ValidationService, 
    dialog: MatDialog,
    dialogRef: MatDialogRef<EnumSchemaComponent>, 
    @Inject(MAT_DIALOG_DATA) data: EnumSchemaCapbilityModel
  ) { 
    this.editorService = editorSerivce;
    this.schemaService = schemaService;
    this._formBuilder = formBuilder;
    this._validationService = validationService;
    this.dialog = dialog;
    this._dialogRef = dialogRef;
    this.enumSchema = new EnumSchemaFormControl(data, this._formBuilder, this._validationService);
    this.schemaTypes = this.editorService.getSchemaTypes();
  }

  public ngOnInit(): void { 
    this.enumSchema.subscribeModelToForm();
  }
}

