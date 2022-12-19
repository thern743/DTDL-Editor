import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor-service.service';
import { MatSelectChange } from '@angular/material/select';
import { SemanticTypeArray } from '../models/SemanticTypeArray';
import { MatDialog } from '@angular/material/dialog';
import { SchemaService } from '../services/schema/schema.service';
import { TelemetryCapabilityFormControl } from '../formControls/TelemetryCapabilityFormControl';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';
import { SchemaTypeEnum } from '../models/SchemaTypeEnum';

@Component({
  selector: 'telemetry-definition',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.scss']
})
export class TelemetryComponent implements OnInit {
  @Input() public formIndex!: [number, number];
  @Input() public telemetry!: TelemetryCapabilityFormControl;
  @Input() public panelOpenState!: boolean;
  public editorService: EditorService;
  public schemaService: SchemaService;
  public dialog: MatDialog;
  public schemaTypes: Array<string>;
  public schemaFormControl!: AbstractCapabilityFormControl<AbstractCapabilityModel>;
  
  constructor(editorService: EditorService, schemaService: SchemaService, dialog: MatDialog) { 
    this.editorService = editorService;
    this.schemaService = schemaService;
    this.dialog = dialog;
    this.schemaTypes = this.getSchemaTypes();
  }

  public ngOnInit(): void {  
    this.telemetry.subscribeModelToForm();
    this.syncHeaderFields();    
  }

  public syncHeaderFields() {
    const id = this.telemetry.form.get("id");
    const name = this.telemetry.form.get("name");

    id?.valueChanges.subscribe(value => {      
      id.setValue(value, { emitEvent: false })
    });

    name?.valueChanges.subscribe(value => {
      name.setValue(value, { emitEvent: false })
    });    
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

  public getUnits(): string[] | undefined {
    let unit = this.telemetry.form.get("semanticType")?.value;
    let units = this.editorService.getUnits().get(unit);
    return units;
  }

  public changeSemanticType($event: MatSelectChange): void {
    let type = this.telemetry.form.get("type");

    if(["", null, undefined].indexOf($event.value) > -1) {
      let semanticType = new SemanticTypeArray("Telemetry");
      type?.setValue(semanticType);      
      let unit = this.telemetry.form.get("unit");
      unit?.setValue(undefined);
    } else {
      let semanticType = new SemanticTypeArray("Telemetry", $event.value);
      type?.setValue(semanticType);
    }
  }

  public isComplex(schema: string): boolean {
    return this.schemaService.getSchemaType(schema) == SchemaTypeEnum.Complex;
  }

  public changeSchema($event: MatSelectChange): void {
    if($event.value instanceof AbstractCapabilityFormControl) return;
    let key = $event.value.toLowerCase();
    let schemaType = this.schemaService.getSchemaType(key);

    if(schemaType == SchemaTypeEnum.Primitive) {
      this.telemetry.form.get("schema")?.setValue(key);
    } else {
      let formControl = this.schemaService.createForm(SchemaTypeEnum[schemaType], key);
      if(formControl === undefined) return;
      this.schemaFormControl = formControl;
    }
  }

  public openSchemaEditor(): void {
    this.schemaService.openSchemaEditor(this.telemetry.form, this.schemaFormControl)
  }
}