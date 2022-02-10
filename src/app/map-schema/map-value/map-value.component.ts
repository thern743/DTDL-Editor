import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractCapabilityFormControl } from 'src/app/formControls/AbstractCapabilityFormControl';
import { MapValueFormControl } from 'src/app/formControls/MapValueFormControl';
import { ICapabilityModel } from 'src/app/models/ICapabilityModel';
import { ISchemaEditor } from 'src/app/models/ISchemaEditor';
import { MapValueCapabilityModel } from 'src/app/models/MapValueCapabilityModel';
import { SchemaService } from 'src/app/services/schema/schema.service';
import { ValidationService } from 'src/app/services/validation/validation-service.service';

@Component({
  selector: 'map-value',
  templateUrl: './map-value.component.html',
  styleUrls: ['./map-value.component.scss']
})
export class MapValueComponent implements OnInit {
  public mapValue!: MapValueFormControl;
  public schemaService: SchemaService;
  public panelOpenState = true;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;
  public dialog: MatDialog;
  public schemaTypes: Map<string, AbstractCapabilityFormControl<ICapabilityModel>>;
  
  constructor(schemaService: SchemaService,
    formBuilder: FormBuilder, 
    validationService: ValidationService, 
    dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: MapValueCapabilityModel) {
      this.schemaService = schemaService;
      this._formBuilder = formBuilder;
      this._validationService = validationService;
      this.dialog = dialog;
      this.mapValue = new MapValueFormControl(data, this._formBuilder, this._validationService, this.dialog);
      this.schemaTypes = this.schemaService.getSchemaTypesFormControls();
  }

  public  ngOnInit(): void {
    this.mapValue.subscribeModelToForm();
  }

  public openEditor(type: string): void {
    let form = this.schemaTypes.get(type.toLowerCase());
    if(form === undefined) return;
    // TODO: This is a hack. Figure out a better solution.
    (<ISchemaEditor><unknown>form).openSchemaEditor(this.mapValue.form);
  }
}
