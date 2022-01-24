import { Component, OnInit } from '@angular/core';
import { ObjectSchemaService } from '../services/object-schema/object-schema.service';
import { FormBuilder } from '@angular/forms';
import { ValidationService } from '../services/validation/validation-service.service';
import { ObjectSchemaFormControl } from '../formControls/ObjectSchemaFormControl';
import { ICapabilityFormControl } from '../formControls/ICapabilityFormControl';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'object-schema-definition',
  templateUrl: './object-schema.component.html',
  styleUrls: ['./object-schema.component.scss']
})
export class ObjectSchemaComponent implements OnInit {
  public objectSchema!: ObjectSchemaFormControl;
  public objectSchemaService: ObjectSchemaService;
  public panelOpenState = true;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;
  private _dialogRef: MatDialogRef<ObjectSchemaComponent>;
  private MAX_LEVEL: number = 5;

  constructor(objectSchemaService: ObjectSchemaService, formBuilder: FormBuilder, validationService: ValidationService, dialogRef: MatDialogRef<ObjectSchemaComponent>) { 
    this.objectSchemaService = objectSchemaService; 
    this._formBuilder = formBuilder; 
    this._validationService = validationService;
    this._dialogRef = dialogRef;
    this.objectSchema = this.objectSchemaService.getObjectSchemaFormControl();
    this.objectSchemaService.addFieldToObjectSchema(this.objectSchema);
  }

  public ngOnInit(): void {
  }

  public getFields(): Array<ICapabilityFormControl<ICapabilityModel>> { 
    return this.objectSchema.fields;
  }

  //DTDL Allows a nesting of objects down to five levels... 
  //i.e. 4 children on the top level object. 
  public canAddChild(): boolean { 
    return this.objectSchema.fields.length <= this.MAX_LEVEL; 
  }
}
