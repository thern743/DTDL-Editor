import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor-service.service';
import { MatSelectChange } from '@angular/material/select';
import { SemanticTypeArray } from '../models/SemanticTypeArray';
import { MatDialog } from '@angular/material/dialog';
import { SchemaService } from '../services/schema/schema.service';
import { TelemetryCapabilityFormControl } from '../formControls/TelemetryCapabilityFormControl';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { ISchemaEditor } from '../models/ISchemaEditor';

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
  public schemaTypes: Map<string, AbstractCapabilityFormControl<ICapabilityModel>>;
  
  constructor(editorService: EditorService, schemaService: SchemaService, dialog: MatDialog) { 
    this.editorService = editorService;
    this.schemaService = schemaService;
    this.dialog = dialog;
    this.schemaTypes = this.schemaService.getSchemaTypesFormControls();
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

  public openEditor(type: string, schemaName: string = "schema"): void {
    let form = this.schemaTypes.get(type.toLowerCase());
    if(form === undefined) return;
    // TODO: This is a hack. Figure out a better solution.
    (<ISchemaEditor><unknown>form).openSchemaEditor(this.telemetry.form, schemaName);
  }
}