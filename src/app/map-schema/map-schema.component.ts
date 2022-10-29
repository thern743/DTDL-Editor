import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { MapSchemaFormControl } from '../formControls/MapSchemaFormControl';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';
import { ISchemaEditor } from '../models/ISchemaEditor';
import { MapSchemaCapabilityModel } from '../models/MapSchemaCapabilityModel';
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
  public keySchemaTypes: Map<string, AbstractCapabilityFormControl<AbstractCapabilityModel>>;
  public valueSchemaTypes: Map<string, AbstractCapabilityFormControl<AbstractCapabilityModel>>;

  constructor(schemaService: SchemaService,
    formBuilder: FormBuilder, 
    validationService: ValidationService, 
    dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: MapSchemaCapabilityModel<AbstractCapabilityModel, AbstractCapabilityModel>
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

  public changeMapKey($event: MatSelectChange): void {
    let formControl = this.schemaService.createForm($event.value);
    if(formControl === undefined) return;
    let schema = this.map.form.get("mapKey.schema");
    if(schema === undefined || schema === null) return;
    schema.setValue(formControl.form);  
  }

  public changeMapValue($event: MatSelectChange): void {
    let formControl = this.schemaService.createForm($event.value);
    if(formControl === undefined) return;
    let schema = this.map.form.get("mapValue.schema");
    if(schema === undefined || schema === null) return;
    schema.setValue(formControl.form);
  }

  public openKeyEditor(type: string, schemaName: string = "schema"): void {
    let form = this.keySchemaTypes.get(type.toLowerCase());
    if(form === undefined) return;    
    // TODO: This is a hack. Figure out a better solution.
    (<ISchemaEditor><unknown>form).openSchemaEditor(this.map.mapKey.form, schemaName);
  }

  public openValueEditor(type: string, schemaName: string = "schema"): void {
    let form = this.valueSchemaTypes.get(type.toLowerCase());
    if(form === undefined) return;
    // TODO: This is a hack. Figure out a better solution.
    (<ISchemaEditor><unknown>form).openSchemaEditor(this.map.mapValue.form, schemaName);
  }
}
