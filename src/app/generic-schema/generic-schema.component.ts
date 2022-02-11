import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenericSchemaFormControl } from '../formControls/GenericSchemaFormControl';
import { GenericSchemaCapabilityModel } from '../models/GenericSchemaCapabilityModel';
import { ObjectSchemaCapabilityModel } from '../models/ObjectSchemaCapabilityModel';
import { SchemaService } from '../services/schema/schema.service';
import { ValidationService } from '../services/validation/validation-service.service';

@Component({
  selector: 'generic-schema',
  templateUrl: './generic-schema.component.html',
  styleUrls: ['./generic-schema.component.scss']
})
export class GenericSchemaComponent implements OnInit {
  public generic!: GenericSchemaFormControl;
  public schemaService: SchemaService;
  public panelOpenState = true;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;
  public dialog: MatDialog;

  constructor(schemaService: SchemaService, 
    formBuilder: FormBuilder, 
    validationService: ValidationService,
    dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: GenericSchemaCapabilityModel
  ) { 
    this.schemaService = schemaService; 
    this._formBuilder = formBuilder; 
    this._validationService = validationService;
    this.dialog = dialog;
    this.generic = new GenericSchemaFormControl(data, this._formBuilder, this._validationService, this.dialog);
  }

  public ngOnInit(): void { 
    this.generic.subscribeModelToForm();
  }
}
