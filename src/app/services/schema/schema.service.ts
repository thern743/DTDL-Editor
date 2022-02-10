import { Injectable } from '@angular/core';
import { FieldCapabilityFormControl } from 'src/app/formControls/FieldCapabilityFormControl';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ValidationService } from '../validation/validation-service.service';
import { FieldCapabilityModel } from 'src/app/models/FieldCapabilityModel';
import { ObjectSchemaFormControl } from 'src/app/formControls/ObjectSchemaFormControl';
import { ObjectSchemaCapbilityModel } from 'src/app/models/ObjectSchemaCapbilityModel';
import { MatDialog } from '@angular/material/dialog';
import { AbstractCapabilityModel } from 'src/app/models/AbstractCapabilityModel';
import { ObjectSchemaComponent } from 'src/app/object-schema/object-schema.component';
import { ArraySchemaComponent } from 'src/app/array-schema/array-schema.component';
import { ArraySchemaCapbilityModel } from 'src/app/models/ArraySchemaCapbilityModel';
import { EnumSchemaComponent } from 'src/app/enum-schema/enum-schema.component';
import { MapSchemaComponent } from 'src/app/map-schema/map-schema.component';
import { EnumSchemaCapbilityModel } from 'src/app/models/EnumSchemaCapbilityModel';
import { MapSchemaCapbilityModel } from 'src/app/models/MapSchemaCapbilityModel';
import { AbstractCapabilityFormControl } from 'src/app/formControls/AbstractCapabilityFormControl';
import { ArraySchemaFormControl } from 'src/app/formControls/ArraySchemaFormControl';
import { BooleanSchemaFormControl } from 'src/app/formControls/BooleanSchemaFormControl';
import { DateSchemaFormControl } from 'src/app/formControls/DateSchemaFormControl';
import { DateTimeSchemaFormControl } from 'src/app/formControls/DateTimeSchemaFormControl';
import { DoubleSchemaFormControl } from 'src/app/formControls/DoubleSchemaFormControl';
import { DurationSchemaFormControl } from 'src/app/formControls/DurationSchemaFormControl';
import { EnumSchemaFormControl } from 'src/app/formControls/EnumSchemaFormControl';
import { FloatSchemaFormControl } from 'src/app/formControls/FloatSchemaFormControl';
import { IntegerSchemaFormControl } from 'src/app/formControls/IntegerSchemaFormControl';
import { LongSchemaFormControl } from 'src/app/formControls/LongSchemaFormControl';
import { MapSchemaFormControl } from 'src/app/formControls/MapSchemaFormControl';
import { StringSchemaFormControl } from 'src/app/formControls/StringSchemaFormControl';
import { TimeSchemaFormControl } from 'src/app/formControls/TimeSchemaFormControl';
import { BooleanSchemaCapbilityModel } from 'src/app/models/BooleanSchemaCapbilityModel';
import { DateSchemaCapbilityModel } from 'src/app/models/DateSchemaCapbilityModel';
import { DateTimeSchemaCapbilityModel } from 'src/app/models/DateTimeSchemaCapbilityModel';
import { DoubleSchemaCapbilityModel } from 'src/app/models/DoubleSchemaCapbilityModel';
import { DurationSchemaCapbilityModel } from 'src/app/models/DurationSchemaCapbilityModel';
import { FloatSchemaCapbilityModel } from 'src/app/models/FloatSchemaCapbilityModel';
import { ICapabilityModel } from 'src/app/models/ICapabilityModel';
import { IntegerSchemaCapbilityModel } from 'src/app/models/IntegerSchemaCapbilityModel';
import { LongSchemaCapbilityModel } from 'src/app/models/LongSchemaCapbilityModel';
import { StringSchemaCapbilityModel } from 'src/app/models/StringSchemaCapbilityModel';
import { TimeSchemaCapbilityModel } from 'src/app/models/TimeSchemaCapbilityModel';
import { EnumValueCapabilityFormControl } from 'src/app/formControls/EnumValueCapabilityFormControl';
import { EnumValueCapabilityModel } from 'src/app/models/EnumValueCapabilityModel';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  public dialog: MatDialog;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;

  constructor(formBuilder: FormBuilder, validationSerivce: ValidationService, dialog: MatDialog) {
    this.dialog = dialog;
    this._formBuilder = formBuilder;
    this._validationService = validationSerivce;
  }

  public getSchemaTypesFormControls(): Map<string, AbstractCapabilityFormControl<ICapabilityModel>> {
    return new Map<string, AbstractCapabilityFormControl<ICapabilityModel>>([
      ["array", new ArraySchemaFormControl(new ArraySchemaCapbilityModel("dtmi:com:Example:MyAarray;1"), this._formBuilder, this._validationService, this.dialog)], 
      ["boolean", new BooleanSchemaFormControl(new BooleanSchemaCapbilityModel("dtmi:com:Example:MyBoolean;1"), this._formBuilder, this._validationService)], 
      ["date", new DateSchemaFormControl(new DateSchemaCapbilityModel("dtmi:com:Example:MyDate;1"), this._formBuilder, this._validationService)], 
      ["dateTime", new DateTimeSchemaFormControl(new DateTimeSchemaCapbilityModel("dtmi:com:Example:MyDateTime;1"), this._formBuilder, this._validationService)], 
      ["double", new DoubleSchemaFormControl(new DoubleSchemaCapbilityModel("dtmi:com:Example:MyDouble;1"), this._formBuilder, this._validationService)], 
      ["duration", new DurationSchemaFormControl(new DurationSchemaCapbilityModel("dtmi:com:Example:MyDuration;1"), this._formBuilder, this._validationService)], 
      ["enum", new EnumSchemaFormControl(new EnumSchemaCapbilityModel("dtmi:com:Example:MyEnum;1"), this._formBuilder, this._validationService, this.dialog)], 
      ["float", new FloatSchemaFormControl(new FloatSchemaCapbilityModel("dtmi:com:Example:MyFloat;1"), this._formBuilder, this._validationService)], 
      ["integer", new IntegerSchemaFormControl(new IntegerSchemaCapbilityModel("dtmi:com:Example:MyInteger;1"), this._formBuilder, this._validationService)], 
      ["long", new LongSchemaFormControl(new LongSchemaCapbilityModel("dtmi:com:Example:MyLong;1"), this._formBuilder, this._validationService)], 
      ["map", new MapSchemaFormControl(new MapSchemaCapbilityModel("dtmi:com:Example:MyMap;1"), this._formBuilder, this._validationService, this.dialog)], 
      ["object", new ObjectSchemaFormControl(new ObjectSchemaCapbilityModel("dtmi:com:Example:MyObject;1"), this._formBuilder, this._validationService, this.dialog)], 
      ["string", new StringSchemaFormControl(new StringSchemaCapbilityModel("dtmi:com:Example:MyString;1"), this._formBuilder, this._validationService)], 
      ["time", new TimeSchemaFormControl(new TimeSchemaCapbilityModel("dtmi:com:Example:MyTtime;1"), this._formBuilder, this._validationService)]  
    ]);
  }

  public addFieldToObjectSchema(objectSchema: ObjectSchemaFormControl): void { 
    let model = new FieldCapabilityModel("dtmi:com:example:MyField;1"); 
    let form = new FieldCapabilityFormControl(model, this._formBuilder, this._validationService);
    objectSchema.fields.push(form);
    objectSchema.model.fields.push(model);
  }

  public addValueToEnumSchema(enumSchema: EnumSchemaFormControl): void { 
    let model = new EnumValueCapabilityModel("dtmi:com:example:MyEnumValue;1"); 
    let form = new EnumValueCapabilityFormControl(model, this._formBuilder, this._validationService);
    enumSchema.enumValues.push(form);
    enumSchema.model.enumValues.push(model);
  }

  public isComplexSchema(form: FormGroup, schemaString: string = 'schema'): boolean {
    let type = form.get(schemaString)?.value?.type[0];
    return ["Array", "Enum", "Map", "Object"].indexOf(type) >= 0;
  }

  public compareSchemas(model1: AbstractCapabilityModel, model2: AbstractCapabilityModel): boolean {
    return model1 && model2 ? model1.type[0] === model2.type[0] : model1 === model2;
  }
}
