import { Component, Inject, OnInit } from '@angular/core';
import { SchemaService } from '../services/schema/schema.service';
import { FormBuilder } from '@angular/forms';
import { ValidationService } from '../services/validation/validation-service.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObjectSchemaCapbilityModel } from '../models/ObjectSchemaCapbilityModel';
import { ObjectSchemaFormControl } from '../formControls/ObjectSchemaFormControl';
import { FieldCapabilityFormControl } from '../formControls/FieldCapabilityFormControl';

@Component({
  selector: 'object-schema',
  templateUrl: './object-schema.component.html',
  styleUrls: ['./object-schema.component.scss']
})
export class ObjectSchemaComponent implements OnInit {
  public object!: ObjectSchemaFormControl;
  public schemaService: SchemaService;
  public panelOpenState = true;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;
  public dialog: MatDialog;
  private MAX_LEVEL: number = 5;

  constructor(schemaService: SchemaService, 
    formBuilder: FormBuilder, 
    validationService: ValidationService,
    dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: ObjectSchemaCapbilityModel
  ) { 
    this.schemaService = schemaService; 
    this._formBuilder = formBuilder; 
    this._validationService = validationService;
    this.dialog = dialog;
    this.object = new ObjectSchemaFormControl(data, this._formBuilder, this._validationService, this.dialog);
  }

  public ngOnInit(): void { 
    this.object.subscribeModelToForm();
  }

  public getFields(): Array<FieldCapabilityFormControl> { 
    return this.object.fields;
  }

  //DTDL Allows a nesting of objects down to five levels... 
  //i.e. 4 children on the top level object. 
  public canAddChild(): boolean { 
    return this.object.fields.length <= this.MAX_LEVEL; 
  }
}
