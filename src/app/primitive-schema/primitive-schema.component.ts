import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SchemaService } from '../services/schema/schema.service';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';

@Component({
  selector: 'primitive-schema',
  templateUrl: './primitive-schema.component.html',
  styleUrls: ['./primitive-schema.component.scss']
})
export class PrimitiveSchemaComponent implements OnInit, OnDestroy {
  public primitive!: AbstractCapabilityFormControl<AbstractCapabilityModel>;
  public schemaService: SchemaService;
  public panelOpenState = true;
  public dialog: MatDialog;

  constructor(schemaService: SchemaService, 
    dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: AbstractCapabilityFormControl<AbstractCapabilityModel>
  ) { 
    this.schemaService = schemaService; 
    this.dialog = dialog;
    this.primitive = data;
  }

  public ngOnInit(): void { 
    this.primitive.subscribeModelToForm(this.primitive.form);
  }

  public ngOnDestroy(): void {
    this.primitive.unsubscribeModelFromForm();
  }
}
