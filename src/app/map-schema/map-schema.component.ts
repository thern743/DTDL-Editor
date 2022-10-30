import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { MapKeyFormControl } from '../formControls/MapKeyFormControl';
import { MapSchemaFormControl } from '../formControls/MapSchemaFormControl';
import { MapValueFormControl } from '../formControls/MapValueFormControl';
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
  public keySchemaTypes: Map<string, MapKeyFormControl | undefined>;
  public valueSchemaTypes: Map<string, MapValueFormControl | undefined>;

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
    this.keySchemaTypes = new Map<string, MapKeyFormControl>();
    this.valueSchemaTypes = new Map<string, MapValueFormControl>();
    this.mapKeysAndValues();
  }

  public ngOnInit(): void { 
    this.map.subscribeModelToForm();    
  }

  private mapKeysAndValues(): void {
    // TODO: No need for value once we refactor the schemaService for proper double-dispatch injection.
    this.schemaService.schemaFactory.mapFormRegistry.get("MapKey")?.forEach((value, key) => {
      this.keySchemaTypes.set(key, undefined);
    });

    this.schemaService.schemaFactory.mapFormRegistry.get("MapValue")?.forEach((value, key) => {
      this.valueSchemaTypes.set(key, undefined)
    });
  }

  public changeMapKey(key: string): AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined {
    let formControl = this.schemaService.createMapForm("MapKey", key.toLowerCase());
    if(formControl === undefined) return;
    let schema = this.map.form.get("mapKey.schema");
    if(schema === undefined || schema === null) return;
    return formControl;  
  }

  public changeMapValue(key: string): AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined {
    let formControl = this.schemaService.createMapForm("MapValue", key.toLowerCase());
    if(formControl === undefined) return;
    let schema = this.map.form.get("mapValue.schema");
    if(schema === undefined || schema === null) return;
    return formControl;
  }

  public openKeyEditor(form: ISchemaEditor): void {
    if(form === undefined) return;
    form.openSchemaEditor(this.map.mapKey.form, "schema");
  }

  public openValueEditor(form: ISchemaEditor): void {
    if(form === undefined) return;
    form.openSchemaEditor(this.map.mapValue.form, "schema");
  }
}
