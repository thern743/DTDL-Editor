import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { ICapabilityFormControl } from '../formControls/ICapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ObjectSchemaEditorComponent } from '../object-schema-editor/object-schema-editor.component';

@Component({
  selector: 'telemetry-definition',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.scss']
})
export class TelemetryComponent implements OnInit {
  @Input() public formIndex!: [number, number];
  @Input() public telemetry!: ICapabilityFormControl<ICapabilityModel>;
  @Input() public panelOpenState!: boolean;
  
  constructor(public editorService: EditorService, public dialog: MatDialog) { 
    
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

  public isObjectSchema() : boolean { 
    return this.telemetry.form.get("schema")?.value === "object"; 
  }

  openObjectSchemaEditor() {
    const dialogRef = this.dialog.open(ObjectSchemaEditorComponent);

    dialogRef.afterClosed().subscribe(result => {
     //TODO: Impliment 
    });
  }
}