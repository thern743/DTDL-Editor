import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { ArraySchemaFormControl } from '../formControls/ArraySchemaFormControl';
import { ArraySchemaCapbilityModel } from '../models/ArraySchemaCapbilityModel';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { ISchemaEditor } from '../models/ISchemaEditor';
import { EditorService } from '../services/editor/editor-service.service';
import { SchemaService } from '../services/schema/schema.service';
import { ValidationService } from '../services/validation/validation-service.service';

@Component({
  selector: 'app-array-schema',
  templateUrl: './array-schema.component.html',
  styleUrls: ['./array-schema.component.scss']
})
export class ArraySchemaComponent implements OnInit {
  public array!: ArraySchemaFormControl;
  public schemaService: SchemaService;
  public panelOpenState = true;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;
  public dialog: MatDialog;
  public schemaTypes: Map<string, AbstractCapabilityFormControl<ICapabilityModel>>;

  constructor(schemaService: SchemaService,
    formBuilder: FormBuilder, 
    validationService: ValidationService, 
    dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: ArraySchemaCapbilityModel
  ) { 
    this.schemaService = schemaService;
    this._formBuilder = formBuilder;
    this._validationService = validationService;
    this.dialog = dialog;
    this.array = new ArraySchemaFormControl(data, this._formBuilder, this._validationService, this.dialog);
    this.schemaTypes = this.schemaService.getSchemaTypesFormControls();
  }

  public ngOnInit(): void { 
    this.array.subscribeModelToForm();
  }

  public openEditor(type: string): void {
    let form = this.schemaTypes.get(type.toLowerCase());
    if(form === undefined) return;
    // TODO: This is a hack. Figure out a better solution.
    (<ISchemaEditor><unknown>form).openSchemaEditor(this.array.form);
  }
}
