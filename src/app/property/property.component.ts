import { Component, Input, OnInit } from '@angular/core';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { ICapabilityFormControl } from '../formControls/ICapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ObjectSchemaEditorComponent } from '../object-schema-editor/object-schema-editor.component';

@Component({
  selector: 'property-definition',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  @Input() public formIndex!: [number, number];
  @Input() public property!: ICapabilityFormControl<ICapabilityModel>;
  @Input() public panelOpenState!: boolean;

  constructor(public editorService: EditorService, public dialog: MatDialog) { 
  }

  public ngOnInit(): void { 
    this.property.subscribeModelToForm();
    this.syncHeaderFields();    
  }

  public syncHeaderFields() {
    const id = this.property.form.get("id");
    const name = this.property.form.get("name");

    id?.valueChanges.subscribe(value => {      
      id.setValue(value, { emitEvent: false })
    });

    name?.valueChanges.subscribe(value => {
      name.setValue(value, { emitEvent: false })
    });    
  }

  public isObjectSchema() : boolean { 
    return this.property.form.get("schema")?.value === "object"; 
  }

  openObjectSchemaEditor() {
    const dialogRef = this.dialog.open(ObjectSchemaEditorComponent);

    dialogRef.afterClosed().subscribe(result => {
     //TODO: Impliment 
    });
  }
}
