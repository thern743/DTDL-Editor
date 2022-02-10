import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractCapabilityFormControl } from 'src/app/formControls/AbstractCapabilityFormControl';
import { MapKeyFormControl } from 'src/app/formControls/MapKeyFormControl';
import { ICapabilityModel } from 'src/app/models/ICapabilityModel';
import { ISchemaEditor } from 'src/app/models/ISchemaEditor';
import { MapKeyCapabilityModel } from 'src/app/models/MapKeyCapabilityModel';
import { SchemaService } from 'src/app/services/schema/schema.service';
import { ValidationService } from 'src/app/services/validation/validation-service.service';

@Component({
  selector: 'map-key-schema',
  templateUrl: './map-key.component.html',
  styleUrls: ['./map-key.component.scss']
})
export class MapKeyComponent implements OnInit {
  public mapKey!: MapKeyFormControl;
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
    @Inject(MAT_DIALOG_DATA) data: MapKeyCapabilityModel) {
      this.schemaService = schemaService;
      this._formBuilder = formBuilder;
      this._validationService = validationService;
      this.dialog = dialog;
      this.mapKey = new MapKeyFormControl(data, this._formBuilder, this._validationService, this.dialog);
      this.schemaTypes = this.schemaService.getSchemaTypesFormControls();
  }

  public  ngOnInit(): void {
    this.mapKey.subscribeModelToForm();
  }

  public openEditor(type: string, schemaName: string = "schema"): void {
    let form = this.schemaTypes.get(type.toLowerCase());
    if(form === undefined) return;
    // TODO: This is a hack. Figure out a better solution.
    (<ISchemaEditor><unknown>form).openSchemaEditor(this.mapKey.form, schemaName);
  }
}
