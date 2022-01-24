import { Component, Input, OnInit } from '@angular/core';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { ICapabilityFormControl } from '../formControls/ICapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service';
import { MatSelectChange } from '@angular/material/select';
import { SemanticTypeArray } from '../models/SemanticTypeArray';
import { MatDialog } from '@angular/material/dialog';
import { ObjectSchemaComponent } from '../object-schema/object-schema.component';
import { ObjectSchemaService } from '../services/object-schema/object-schema.service';

@Component({
  selector: 'telemetry-definition',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.scss']
})
export class TelemetryComponent implements OnInit {
  @Input() public formIndex!: [number, number];
  @Input() public telemetry!: ICapabilityFormControl<ICapabilityModel>;
  @Input() public panelOpenState!: boolean;
  public editorService: EditorService;
  public objectSchemaService: ObjectSchemaService;
  public dialog: MatDialog;
  
  constructor(editorService: EditorService, objectSchemaEditor: ObjectSchemaService, dialog: MatDialog) { 
    this.editorService = editorService;
    this.objectSchemaService = objectSchemaEditor;
    this.dialog = dialog;
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
      let val = new SemanticTypeArray("Telemetry");
      type?.setValue(val);      
      let unit = this.telemetry.form.get("unit");
      unit?.setValue(undefined);
    } else {
      let val = new SemanticTypeArray("Telemetry", $event.value);
      type?.setValue(val);
    }
  }

  public openObjectSchemaEditor() {
    const dialogRef = this.dialog.open(ObjectSchemaComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.telemetry.form.get("schema")?.setValue(result, { emitEvent: false });
      } 
    });
  }

  public isObjectSchema() {
    let val = this.objectSchemaService.isObjectSchema(this.telemetry.form.get('schema')?.value);
    return val;
  }
}