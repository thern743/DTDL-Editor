import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { ArraySchemaFormControl } from '../formControls/ArraySchemaFormControl';
import { SchemaService } from '../services/schema/schema.service';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';
import { MatSelectChange } from '@angular/material/select';
import { SchemaTypeEnum } from '../models/SchemaTypeEnum';

@Component({
  selector: 'array-schema',
  templateUrl: './array-schema.component.html',
  styleUrls: ['./array-schema.component.scss']
})
export class ArraySchemaComponent implements OnInit {
  public array!: ArraySchemaFormControl;
  public schemaService: SchemaService;
  public panelOpenState = true;
  public dialog: MatDialog;
  public schemaTypes: Array<string>;
  public schemaFormControl!: AbstractCapabilityFormControl<AbstractCapabilityModel>;

  constructor(schemaService: SchemaService,
    dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: ArraySchemaFormControl
  ) { 
    this.schemaService = schemaService;
    this.dialog = dialog;
    this.array = data;
    this.schemaTypes = this.getSchemaTypes();
  }

  public ngOnInit(): void { 
    this.array.subscribeModelToForm();
  }

  private getSchemaTypes(): Array<string> {
    let schemaTypes = new Array<string>();
    
    this.schemaService.schemaFactory.formRegistry.get("Primitive")?.forEach((value, key) => {
      schemaTypes.push(key);
    });

    this.schemaService.schemaFactory.formRegistry.get("Complex")?.forEach((value, key) => {
      schemaTypes.push(key);
    });

    return schemaTypes;
  }

  public isComplex(schema: string): boolean {
    return this.schemaService.getSchemaType(schema) == SchemaTypeEnum.Complex;
  }

  public changeSchema($event: MatSelectChange): void {
    if($event.value instanceof AbstractCapabilityFormControl) return;
    let key = $event.value.toLowerCase();
    let schemaType = this.schemaService.getSchemaType(key);

    if(schemaType == SchemaTypeEnum.Primitive) {
      this.array.form.get("elementSchema")?.setValue(key);
    } else {
      let formControl = this.schemaService.createForm(SchemaTypeEnum[schemaType], key);
      if(formControl === undefined) return;
      this.schemaFormControl = formControl;
    }
  }

  public openSchemaEditor(): void {
    this.schemaService.openSchemaEditor(this.array.form, this.schemaFormControl)
  }
}
