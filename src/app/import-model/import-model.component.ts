import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';
import { InterfaceCapabilityModel } from '../models/InterfaceCapabilityModel';
import { EditorService } from '../services/editor/editor.service';
import { ValidationService } from '../services/validation/validation-service.service';
import { SchemaService } from '../services/schema/schema.service';

@Component({
  selector: 'import-model',
  templateUrl: './import-model.component.html',
  styleUrls: ['./import-model.component.scss']
})
export class ImportModelComponent implements OnInit {
  private _editorService: EditorService;
  private _validationService: ValidationService;
  private _schemaService: SchemaService;
  private _formBuilder: UntypedFormBuilder;
  private _dialog: MatDialog;

  constructor(editorService: EditorService, validationService: ValidationService, schemaService: SchemaService, formBuilder: UntypedFormBuilder, dialog: MatDialog) { 
    this._editorService = editorService;
    this._validationService = validationService;
    this._schemaService = schemaService;
    this._formBuilder = formBuilder;
    this._dialog = dialog;
  }

  public ngOnInit(): void {
  }

  public addInterface($event: InterfaceCapabilityModel): void {
    var formControl = new InterfaceCapabilityFormControl($event, this._validationService, this._schemaService, this._formBuilder, this._dialog);
    this._editorService.addInterface(formControl);
  }
}
