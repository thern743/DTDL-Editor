import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { MapKeyFormControl } from '../formControls/MapKeyFormControl';
import { MapSchemaFormControl } from '../formControls/MapSchemaFormControl';
import { MapValueFormControl } from '../formControls/MapValueFormControl';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';
import { SchemaTypeEnum } from '../models/SchemaTypeEnum';
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
    this.schemaService.getFormsRegistry().get("MapKey")?.forEach((value, key) => {
      this.keySchemaTypes.push(key);
    });

    this.schemaService.getModelsRegistry().get("MapValue")?.forEach((value, key) => {
      this.valueSchemaTypes.push(key)
    });
  }

  public changeMapKey($event: MatSelectChange): void {
    if ($event.value instanceof AbstractCapabilityFormControl) return;
    let key = $event.value.toLowerCase();
    let schemaType = this.schemaService.getSchemaTypeEnum(key);
    this.map.form.get("mapKey")?.get("schema")?.setValue(key);

    if (schemaType == SchemaTypeEnum.Complex) {
      let formControl = this.schemaService.createForm("MapKey", key);
      if (formControl === undefined) return;
      this.keySchemaFormControl = formControl;
    }
  }

  public changeMapValue($event: MatSelectChange): void {
    if ($event.value instanceof AbstractCapabilityFormControl) return;
    let key = $event.value.toLowerCase();
    let schemaType = this.schemaService.getSchemaTypeEnum(key);
    this.map.form.get("mapValue")?.get("schema")?.setValue(key);

    if (schemaType == SchemaTypeEnum.Complex) {
      let formControl = this.schemaService.createForm("MapValue", key);
      if (formControl === undefined) return;
      this.valueSchemaFormControl = formControl;
    }
  }

  public openKeyEditor(): void {
    this.schemaService.openSchemaEditor(this.map.form, this.keySchemaFormControl);
  }

  public openValueEditor(): void {
    this.schemaService.openSchemaEditor(this.map.form, this.valueSchemaFormControl);
  }
}
