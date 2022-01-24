import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICapabilityFormControl } from '../formControls/ICapabilityFormControl';
import { FieldCapabilityModel } from '../models/FieldCapabilityModel';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { ObjectSchemaComponent } from '../object-schema/object-schema.component';
import { EditorService } from '../services/editor/editor-service.service';
import { ObjectSchemaService } from '../services/object-schema/object-schema.service';

@Component({
  selector: 'field-definition',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() public formIndex!: number;
  @Input() public field!: ICapabilityFormControl<ICapabilityModel>;
  public objectSchemaService: ObjectSchemaService; 
  public editorService: EditorService;
  public dialog: MatDialog;
  public panelOpenState = true;

  constructor(objectSchemaEditorService: ObjectSchemaService, editorSerivce: EditorService, dialog: MatDialog) { 
    this.objectSchemaService = objectSchemaEditorService; 
    this.editorService = editorSerivce;
    this.dialog = dialog;
  }

  ngOnInit(): void {
    this.field.subscribeModelToForm();
  }

  public addChild() : void { 
    this.objectSchemaService.addChildField(this.field);
  }

  public openObjectSchemaEditor() {
    const dialogRef = this.dialog.open(ObjectSchemaComponent);

    dialogRef.afterClosed().subscribe((result: FieldCapabilityModel) => {
      if (result != null) {
        this.field.form.get("schema")?.setValue(result, { emitEvent: false });
      } 
    });
  }

  public isObjectSchema() {
    let schema = this.field.form.get("schema")?.value;
    let val = this.objectSchemaService.isObjectSchema(schema);
    return val;
  }
}