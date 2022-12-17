import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractCapabilityFormControl } from 'src/app/formControls/AbstractCapabilityFormControl';
import { MapValueFormControl } from 'src/app/formControls/MapValueFormControl';
import { ICapabilityModel } from 'src/app/models/ICapabilityModel';
import { SchemaService } from 'src/app/services/schema/schema.service';

@Component({
  selector: 'map-value-schema',
  templateUrl: './map-value.component.html',
  styleUrls: ['./map-value.component.scss']
})
export class MapValueComponent implements OnInit {
  public mapValue!: MapValueFormControl;
  public schemaService: SchemaService;
  public panelOpenState = true;
  public dialog: MatDialog;
  public schemaTypes: Map<string, AbstractCapabilityFormControl<ICapabilityModel>>;
  
  constructor(schemaService: SchemaService,
    dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: MapValueFormControl) {
      this.schemaService = schemaService;
      this.dialog = dialog;
      this.mapValue = data;
      this.schemaTypes = this.schemaService.getSchemaTypesFormControls();
  }

  public  ngOnInit(): void {
    this.mapValue.subscribeModelToForm();
  }
}
