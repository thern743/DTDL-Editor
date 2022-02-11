import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { GenericSchemaFormControl } from '../formControls/GenericSchemaFormControl';
import { MapKeyFormControl } from '../formControls/MapKeyFormControl';
import { MapSchemaFormControl } from '../formControls/MapSchemaFormControl';
import { GenericSchemaCapabilityModel } from '../models/GenericSchemaCapabilityModel';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { ISchemaEditor } from '../models/ISchemaEditor';
import { MapKeyCapabilityModel } from '../models/MapKeyCapabilityModel';
import { MapSchemaCapabilityModel } from '../models/MapSchemaCapabilityModel';
import { SchemaService } from '../services/schema/schema.service';
import { ValidationService } from '../services/validation/validation-service.service';

@Component({
  selector: 'map-schema',
  templateUrl: './map-schema.component.html',
  styleUrls: ['./map-schema.component.scss']
})
export class MapSchemaComponent implements OnInit {
  public map!: MapSchemaFormControl;
  public schemaService: SchemaService;
  public panelOpenState = true;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;
  public dialog: MatDialog;
  public keySchemaTypes: Map<string, AbstractCapabilityFormControl<ICapabilityModel>>;
  public schemaTypes: Map<string, AbstractCapabilityFormControl<ICapabilityModel>>;

  constructor(schemaService: SchemaService,
    formBuilder: FormBuilder, 
    validationService: ValidationService, 
    dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: MapSchemaCapabilityModel
  ) { 
    this.schemaService = schemaService;
    this._formBuilder = formBuilder;
    this._validationService = validationService;
    this.dialog = dialog;
    this.map = new MapSchemaFormControl(data, this._formBuilder, this._validationService, this.dialog);
    this.keySchemaTypes = this.getKeySchemaTypes();
    this.schemaTypes = this.schemaService.getSchemaTypesFormControls();
  }

  public ngOnInit(): void { 
    this.map.subscribeModelToForm();
  }

  public openKeyEditor(type: string, schemaName: string = "mapKey"): void {
    let form = this.keySchemaTypes.get(type.toLowerCase());
    if(form === undefined) return;
    // TODO: This is a hack. Figure out a better solution.
    (<ISchemaEditor><unknown>form).openSchemaEditor(this.map.form, schemaName);
  }

  public openValueEditor(type: string, schemaName: string = "mapValue"): void {
    let form = this.schemaTypes.get(type.toLowerCase());
    if(form === undefined) return;
    // TODO: This is a hack. Figure out a better solution.
    (<ISchemaEditor><unknown>form).openSchemaEditor(this.map.form, schemaName);
  }

  private getKeySchemaTypes(): Map<string, AbstractCapabilityFormControl<ICapabilityModel>> {
    return new Map<string, AbstractCapabilityFormControl<ICapabilityModel>>([
      ["integer", new MapKeyFormControl(new MapKeyCapabilityModel("dtmi:com:Example:MyInteger;1"), this._formBuilder, this._validationService, this.dialog)],
      ["string", new MapKeyFormControl(new MapKeyCapabilityModel("dtmi:com:Example:MyString;1"), this._formBuilder, this._validationService, this.dialog)]
    ]);
  }
}
