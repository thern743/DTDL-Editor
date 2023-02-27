import { Component, Inject, OnInit } from '@angular/core';
import { SchemaService } from '../services/schema/schema.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObjectSchemaFormControl } from '../formControls/schemas/ObjectSchemaFormControl';
import { FieldCapabilityFormControl } from '../formControls/FieldCapabilityFormControl';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'object-schema',
  templateUrl: './object-schema.component.html',
  styleUrls: ['./object-schema.component.scss']
})
export class ObjectSchemaComponent implements OnInit {
  public object!: ObjectSchemaFormControl;
  public schemaService: SchemaService;
  public panelOpenState = true;
  public dialog: MatDialog;
  private MAX_LEVEL: number = 5;
  public interfaceSchemaControl: FormControl = new FormControl();

  constructor(schemaService: SchemaService, dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data: ObjectSchemaFormControl) { 
    this.schemaService = schemaService; 
    this.dialog = dialog;
    this.object = data;
  }

  public ngOnInit(): void { 
    this.object.subscribeModelToForm(this.object.form);
  }

  public getFields(): Array<FieldCapabilityFormControl> { 
    return this.object.fields;
  }
}
