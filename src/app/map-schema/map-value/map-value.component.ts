import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MapValueFormControl } from '../../formControls/MapValueFormControl';
import { SchemaService } from '../../services/schema/schema.service';

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
  
  constructor(schemaService: SchemaService,
    dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: MapValueFormControl) {
      this.schemaService = schemaService;
      this.dialog = dialog;
      this.mapValue = data;
  }

  public  ngOnInit(): void {
    this.mapValue.subscribeModelToForm();
  }
}
