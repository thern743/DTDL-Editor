import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { SchemaService } from '../services/schema/schema.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObjectSchemaFormControl } from '../formControls/schemas/ObjectSchemaFormControl';
import { FieldCapabilityFormControl } from '../formControls/FieldCapabilityFormControl';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'object-schema',
  templateUrl: './object-schema.component.html',
  styleUrls: ['./object-schema.component.scss']
})
export class ObjectSchemaComponent implements OnInit, OnDestroy {
  @Input()
  public object!: ObjectSchemaFormControl;
  public schemaService: SchemaService;
  public panelOpenState = true;
  private MAX_LEVEL: number = 5;
  public interfaceSchemaControl: UntypedFormControl = new UntypedFormControl();

  constructor(schemaService: SchemaService) { 
    this.schemaService = schemaService; 
  }

  public ngOnInit(): void { 
    this.object.subscribeModelToForm(this.object.form);
  }

  public ngOnDestroy(): void {
    this.object.unsubscribeModelFromForm();
  }

  public getFields(): Array<FieldCapabilityFormControl> { 
    return this.object.fields;
  }
}
