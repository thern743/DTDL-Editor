import { Component, Inject, OnInit } from '@angular/core';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { EnumSchemaFormControl } from '../formControls/schemas/EnumSchemaFormControl';
import { EditorService } from '../services/editor/editor-service.service';
import { SchemaService } from '../services/schema/schema.service';
import { EnumValueCapabilityModel } from '../models/EnumValueCapabilityModel';

@Component({
  selector: 'enum-schema',
  templateUrl: './enum-schema.component.html',
  styleUrls: ['./enum-schema.component.scss']
})
export class EnumSchemaComponent implements OnInit {
  public enum!: EnumSchemaFormControl;
  private _schemaService: SchemaService;
  private _editorService: EditorService;
  public panelOpenState = true;

  constructor(
    editorService: EditorService, 
    schemaService: SchemaService,
    @Inject(MAT_DIALOG_DATA) data: EnumSchemaFormControl
  ) { 
    this._editorService = editorService;
    this._schemaService = schemaService;
    this.enum = data;
  }

  public ngOnInit(): void { 
    this.enum.subscribeModelToForm(this.enum.form);
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

