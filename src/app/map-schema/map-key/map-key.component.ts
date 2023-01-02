import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractCapabilityFormControl } from 'src/app/formControls/AbstractCapabilityFormControl';
import { MapKeyFormControl } from 'src/app/formControls/MapKeyFormControl';
import { ICapabilityModel } from 'src/app/models/interfaces/ICapabilityModel';
import { SchemaService } from 'src/app/services/schema/schema.service';

@Component({
  selector: 'map-key-schema',
  templateUrl: './map-key.component.html',
  styleUrls: ['./map-key.component.scss']
})
export class MapKeyComponent implements OnInit {
  public mapKey!: MapKeyFormControl;
  public schemaService: SchemaService;
  public panelOpenState = true;
  public dialog: MatDialog;

  constructor(schemaService: SchemaService,
    dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: MapKeyFormControl) {
      this.schemaService = schemaService;
      this.dialog = dialog;
      this.mapKey = data;
  }

  public ngOnInit(): void {
    this.mapKey.subscribeModelToForm();
  }
}
