import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { MapSchemaFormControl } from '../formControls/MapSchemaFormControl';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { ISchemaEditor } from '../models/ISchemaEditor';
import { MapSchemaCapbilityModel } from '../models/MapSchemaCapbilityModel';
import { SchemaService } from '../services/schema/schema.service';
import { ValidationService } from '../services/validation/validation-service.service';

@Component({
  selector: 'map-schema',
  templateUrl: './map-schema.component.html',
  styleUrls: ['./map-schema.component.scss']
})
export class MapSchemaComponent implements OnInit {
  public map!: MapSchemaFormControl;
  public schemaService: SchemaService;
  public panelOpenState = true;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;
  public dialog: MatDialog;
  public keySchemaTypes: Map<string, AbstractCapabilityFormControl<ICapabilityModel>>;
  public valueSchemaTypes: Map<string, AbstractCapabilityFormControl<ICapabilityModel>>;

  constructor(schemaService: SchemaService,
    formBuilder: FormBuilder, 
    validationService: ValidationService, 
    dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: MapSchemaCapbilityModel
  ) { 
    this.schemaService = schemaService;
    this._formBuilder = formBuilder;
    this._validationService = validationService;
    this.dialog = dialog;
    this.map = new MapSchemaFormControl(data, this._formBuilder, this._validationService, this.dialog);
    this.keySchemaTypes = this.schemaService.getSchemaTypesFormControls();
    this.valueSchemaTypes = this.schemaService.getSchemaTypesFormControls();
  }

  public ngOnInit(): void { 
    this.map.subscribeModelToForm();
  }

  public openKeyEditor(type: string): void {
    let form = this.keySchemaTypes.get(type.toLowerCase());
    if(form === undefined) return;
    // TODO: This is a hack. Figure out a better solution.
    (<ISchemaEditor><unknown>form).openSchemaEditor(this.map.form);
  }

  public openValueEditor(type: string): void {
    let form = this.valueSchemaTypes.get(type.toLowerCase());
    if(form === undefined) return;
    // TODO: This is a hack. Figure out a better solution.
    (<ISchemaEditor><unknown>form).openSchemaEditor(this.map.form);
  }
}
