import { Component, Inject, OnInit } from '@angular/core';
import { SchemaService } from '../services/schema/schema.service';
import { FormBuilder } from '@angular/forms';
import { ValidationService } from '../services/validation/validation-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObjectSchemaCapbilityModel } from '../models/ObjectSchemaCapbilityModel';
import { FieldCapabilityModel } from '../models/FieldCapabilityModel';
import { ObjectSchemaFormControl } from '../formControls/ObjectSchemaFormControl';
import { ICapabilityFormControl } from '../formControls/ICapabilityFormControl';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { FieldCapabilityFormControl } from '../formControls/FieldCapabilityFormControl';

@Component({
  selector: 'object-schema-definition',
  templateUrl: './object-schema.component.html',
  styleUrls: ['./object-schema.component.scss']
})
export class ObjectSchemaComponent implements OnInit {
  public objectSchema!: ObjectSchemaFormControl;
  public objectSchemaService: SchemaService;
  public panelOpenState = true;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;
  private _dialogRef: MatDialogRef<ObjectSchemaComponent>;
  private MAX_LEVEL: number = 5;

  constructor(objectSchemaService: SchemaService, 
    formBuilder: FormBuilder, 
    validationService: ValidationService, 
    dialogRef: MatDialogRef<ObjectSchemaComponent>, 
    @Inject(MAT_DIALOG_DATA) data: ObjectSchemaCapbilityModel
  ) { 
    this.objectSchemaService = objectSchemaService; 
    this._formBuilder = formBuilder; 
    this._validationService = validationService;
    this._dialogRef = dialogRef;
    this.objectSchema = new ObjectSchemaFormControl(data, this._formBuilder, this._validationService);
  }

  public ngOnInit(): void { 
    this.objectSchema.subscribeModelToForm();
  }

  public getFields(): Array<FieldCapabilityFormControl> { 
    return this.objectSchema.fields;
  }

  //DTDL Allows a nesting of objects down to five levels... 
  //i.e. 4 children on the top level object. 
  public canAddChild(): boolean { 
    return this.objectSchema.fields.length <= this.MAX_LEVEL; 
  }
}
