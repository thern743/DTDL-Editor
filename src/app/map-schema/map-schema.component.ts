import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { MapKeyFormControl } from '../formControls/MapKeyFormControl';
import { MapSchemaFormControl } from '../formControls/MapSchemaFormControl';
import { MapValueFormControl } from '../formControls/MapValueFormControl';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';
import { SchemaService } from '../services/schema/schema.service';

@Component({
  selector: 'map-schema',
  templateUrl: './map-schema.component.html',
  styleUrls: ['./map-schema.component.scss']
})
export class MapSchemaComponent implements OnInit {
  public map!: MapSchemaFormControl;
  public schemaService: SchemaService;
  public panelOpenState = true;
  public dialog: MatDialog;
  public keySchemaTypes: string[];
  public valueSchemaTypes: string[]
  public keySchemaFormControl!: AbstractCapabilityFormControl<AbstractCapabilityModel>;
  public valueSchemaFormControl!: AbstractCapabilityFormControl<AbstractCapabilityModel>;

  constructor(schemaService: SchemaService,
    dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: MapSchemaFormControl
  ) { 
    this.schemaService = schemaService;
    this.dialog = dialog;
    this.map = data;
    this.keySchemaTypes = new Array<string>();
    this.valueSchemaTypes = new Array<string>();
    this.mapKeysAndValues();
  }

  public ngOnInit(): void { 
    this.map.subscribeModelToForm();    
  }

  private mapKeysAndValues(): void {
    // TODO: No need for value once we refactor the schemaService for proper double-dispatch injection.
    this.schemaService.schemaFactory.formRegistry.get("MapKey")?.forEach((value, key) => {
      this.keySchemaTypes.push(key);
    });

    this.schemaService.schemaFactory.formRegistry.get("MapValue")?.forEach((value, key) => {
      this.valueSchemaTypes.push(key)
    });
  }

  public changeMapKey($event: MatSelectChange): void {
    if($event.value instanceof AbstractCapabilityFormControl) return;
    let key = $event.value.toLowerCase();
    let formControl = this.schemaService.createForm("MapKey", key) as MapKeyFormControl;
    if(formControl === undefined) return;
    this.keySchemaFormControl = formControl;
  }

  public changeMapValue($event: MatSelectChange): void {
    if($event.value instanceof AbstractCapabilityFormControl) return;
    let key = $event.value.toLowerCase();
    let formControl = this.schemaService.createForm("MapValue", key) as MapValueFormControl;
    if(formControl === undefined) return;
    this.valueSchemaFormControl = formControl;
  }

  public openKeyEditor(): void {
    this.schemaService.openSchemaEditor(this.map.form, this.keySchemaFormControl);
  }

  public openValueEditor(): void {
    this.schemaService.openSchemaEditor(this.map.form, this.valueSchemaFormControl);
  }
}
