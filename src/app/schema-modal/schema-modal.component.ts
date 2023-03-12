import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { ArraySchemaFormControl } from '../formControls/schemas/ArraySchemaFormControl';
import { EnumSchemaFormControl } from '../formControls/schemas/EnumSchemaFormControl';
import { MapSchemaFormControl } from '../formControls/schemas/MapSchemaFormControl';
import { ObjectSchemaFormControl } from '../formControls/schemas/ObjectSchemaFormControl';
import { AbstractSchemaModel } from '../models/AbstractSchemaModel';
import { SchemaModalParameters } from '../models/SchemaModalParameters';
import { SchemaModalResult } from '../models/SchemaModalResult';

@Component({
  selector: 'schema-modal',
  templateUrl: './schema-modal.component.html',
  styleUrls: ['./schema-modal.component.scss']
})
export class SchemaModalComponent implements OnInit {
  public title: string = "TODO";
  public schemaType!: string;
  public interfaceSchemaControl: UntypedFormControl;
  public schemaFormControl: AbstractCapabilityFormControl<AbstractSchemaModel>;
  
  constructor(@Inject(MAT_DIALOG_DATA) data: SchemaModalParameters) {
    this.title = data.title;
    this.schemaType = data.schemaType;
    this.schemaFormControl = data.schemaFormControl;
    this.interfaceSchemaControl = new UntypedFormControl(data.isInterfaceSchema);
  }

  public ngOnInit(): void {

  }

  public getArrayData(): ArraySchemaFormControl {
    return this.schemaFormControl as ArraySchemaFormControl;
  }

  public getEnumData(): EnumSchemaFormControl {
    return this.schemaFormControl as EnumSchemaFormControl;
  }

  public getMapData(): MapSchemaFormControl {
    return this.schemaFormControl as MapSchemaFormControl;
  }

  public getObjectData(): ObjectSchemaFormControl {
    return this.schemaFormControl as ObjectSchemaFormControl;
  }

  public getData(): any {
    const schemaResult = new SchemaModalResult(this.schemaFormControl, this.interfaceSchemaControl.value)
    return schemaResult;
  }
}
