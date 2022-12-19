import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { EnumSchemaFormControl } from '../formControls/EnumSchemaFormControl';
import { SchemaTypeEnum } from '../models/SchemaTypeEnum';
import { EditorService } from '../services/editor/editor-service.service';
import { SchemaService } from '../services/schema/schema.service';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';

@Component({
  selector: 'enum-schema',
  templateUrl: './enum-schema.component.html',
  styleUrls: ['./enum-schema.component.scss']
})
export class EnumSchemaComponent implements OnInit {
  public enum!: EnumSchemaFormControl;
  public schemaService: SchemaService;
  public editorService: EditorService;
  public panelOpenState = true;

  constructor(
    editorSerivce: EditorService, 
    schemaService: SchemaService,
    @Inject(MAT_DIALOG_DATA) data: EnumSchemaFormControl
  ) { 
    this.editorService = editorSerivce;
    this.schemaService = schemaService;
    this.enum = data;
  }

  public ngOnInit(): void { 
    this.enum.subscribeModelToForm();
  }

  public addValue(): void {
    
  }

  public changeSchema($event: MatSelectChange): void {
    if($event.value instanceof AbstractCapabilityFormControl) return;
    let key = $event.value.toLowerCase();
    // Always a Primitive type
    this.enum.form.get("valueSchema")?.setValue(key);
  }
}

