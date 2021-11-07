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
  @Input() public formIndex: number = 0;
  @Input() public property!: ICapabilityFormControl<ICapabilityModel>;
  public panelOpenState = false;

  constructor(public editorService: EditorService, public dialog: MatDialog) { 
  }

  public ngOnInit(): void { 
    this.property.subscribeModelToForm();
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
