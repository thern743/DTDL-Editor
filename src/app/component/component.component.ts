import { Component, Input, OnInit } from '@angular/core';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { ICapabilityFormControl } from '../formControls/ICapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service';
import { ObjectSchemaEditorComponent } from '../object-schema-editor/object-schema-editor.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'component-definition',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {
  @Input() public formIndex!: [number, number];
  @Input() public component!: ICapabilityFormControl<ICapabilityModel>;
  @Input() public panelOpenState!: boolean;

  constructor(public editorService: EditorService, public dialog: MatDialog) { 
    
  }

  public ngOnInit(): void { 
    this.component.subscribeModelToForm();
    this.syncHeaderFields();    
  }

  public syncHeaderFields() {
    const id = this.component.form.get("id");
    const name = this.component.form.get("name");

    id?.valueChanges.subscribe(value => {      
      id.setValue(value, { emitEvent: false })
    });

    name?.valueChanges.subscribe(value => {
      name.setValue(value, { emitEvent: false })
    });    
  }

  public isObjectSchema() : boolean { 
    return this.component.form.get("schema")?.value === "object"; 
  }

  openObjectSchemaEditor() {
    const dialogRef = this.dialog.open(ObjectSchemaEditorComponent);

    dialogRef.afterClosed().subscribe(result => {
     //TODO: Impliment 
    });
  }
}
