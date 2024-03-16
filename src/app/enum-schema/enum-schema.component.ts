import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { EnumSchemaFormControl } from '../formControls/schemas/EnumSchemaFormControl';
import { SchemaService } from '../services/schema/schema.service';
import { EnumValueCapabilityModel } from '../models/EnumValueCapabilityModel';

@Component({
  selector: 'enum-schema',
  templateUrl: './enum-schema.component.html',
  styleUrls: ['./enum-schema.component.scss']
})
export class EnumSchemaComponent implements OnInit, OnDestroy {
  @Input()
  public enum!: EnumSchemaFormControl;
  private _schemaService: SchemaService;
  public panelOpenState = true;

  constructor(schemaService: SchemaService) { 
    this._schemaService = schemaService;
  }

  public ngOnInit(): void { 
    this.enum.subscribeModelToForm(this.enum.form);
  }

  public ngOnDestroy(): void {
    this.enum.unsubscribeModelFromForm();
  }

  public addValue(): void {
    this._schemaService.addValueToEnumSchema(this.enum);
  }

  public changeSchema($event: MatSelectChange): void {
    if($event.value instanceof AbstractCapabilityFormControl) return;
    let key = $event.value.toLowerCase();
    // Always a Primitive type
    this.enum.form.get("valueSchema")?.setValue(key);
    this.setValueInModel();
  }

  public setValueInModel(): void {
    if (this.enum.form.get("valueSchema")?.value === "integer") {
      this.enum.model.enumValues.forEach((enumValue: EnumValueCapabilityModel) => {
        enumValue.enumValue = parseInt(enumValue.enumValue as string);
      });
    } else {
      this.enum.model.enumValues.forEach((enumValue: EnumValueCapabilityModel) => {
        enumValue.enumValue = enumValue.enumValue.toString();
      });
    }
  }
}

