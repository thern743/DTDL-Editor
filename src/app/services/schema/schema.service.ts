import { Injectable } from '@angular/core';
import { FieldCapabilityFormControl } from 'src/app/formControls/FieldCapabilityFormControl';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from '../validation/validation-service.service';
import { FieldCapabilityModel } from 'src/app/models/FieldCapabilityModel';
import { ObjectSchemaFormControl } from 'src/app/formControls/ObjectSchemaFormControl';
import { ObjectSchemaCapabilityModel } from 'src/app/models/ObjectSchemaCapabilityModel';
import { MatDialog } from '@angular/material/dialog';
import { AbstractCapabilityModel } from 'src/app/models/AbstractCapabilityModel';
import { ArraySchemaCapabilityModel } from 'src/app/models/ArraySchemaCapabilityModel';
import { EnumSchemaCapabilityModel } from 'src/app/models/EnumSchemaCapabilityModel';
import { MapSchemaCapabilityModel } from 'src/app/models/MapSchemaCapabilityModel';
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
import { BooleanSchemaCapabilityModel } from 'src/app/models/BooleanSchemaCapabilityModel';
import { DateSchemaCapabilityModel } from 'src/app/models/DateSchemaCapabilityModel';
import { DateTimeSchemaCapabilityModel } from 'src/app/models/DateTimeSchemaCapabilityModel';
import { DoubleSchemaCapabilityModel } from 'src/app/models/DoubleSchemaCapabilityModel';
import { DurationSchemaCapabilityModel } from 'src/app/models/DurationSchemaCapabilityModel';
import { FloatSchemaCapabilityModel } from 'src/app/models/FloatSchemaCapabilityModel';
import { ICapabilityModel } from 'src/app/models/ICapabilityModel';
import { IntegerSchemaCapabilityModel } from 'src/app/models/IntegerSchemaCapabilityModel';
import { LongSchemaCapabilityModel } from 'src/app/models/LongSchemaCapabilityModel';
import { StringSchemaCapabilityModel } from 'src/app/models/StringSchemaCapabilityModel';
import { TimeSchemaCapabilityModel } from 'src/app/models/TimeSchemaCapabilityModel';
import { EnumValueCapabilityFormControl } from 'src/app/formControls/EnumValueCapabilityFormControl';
import { EnumValueCapabilityModel } from 'src/app/models/EnumValueCapabilityModel';
import { IFormFactory } from '../IFormFactory';
import { IModelFactory } from '../IModelFactory';
import { MapKeyCapabilityModel } from 'src/app/models/MapKeyCapabilityModel';
import { MapValueCapabilityModel } from 'src/app/models/MapValueCapabilityModel';
import { IMapFactory } from '../IMapFactory';
import { SchemaFactory } from 'src/app/schemas/SchemaFactory';
import { MapKeyFormControl } from 'src/app/formControls/MapKeyFormControl';
import { MapValueFormControl } from 'src/app/formControls/MapValueFormControl';
import { ISchemaFactory } from 'src/app/schemas/ISchemaFactory';

// TODO: Should probably move all the factory methods to their respective forms/models and use double-dispatch to inject themselves into this factory.
@Injectable({
  providedIn: 'root'
})
export class SchemaService implements IFormFactory, IModelFactory, IMapFactory {
  public schemaFactory: ISchemaFactory;
  public dialog: MatDialog;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;

  constructor(schemaFactory: SchemaFactory, formBuilder: FormBuilder, validationSerivce: ValidationService, dialog: MatDialog) {
    this.schemaFactory = schemaFactory;
    this.dialog = dialog;
    this._formBuilder = formBuilder;
    this._validationService = validationSerivce;
  }

  // TODO: New these up at selection time using createForm()
  // TODO: Get root DTMI path from settings.
  // TODO: Add methodds for returning MapKey and MapValue types.
  public getSchemaTypesFormControls(): Map<string, AbstractCapabilityFormControl<ICapabilityModel>> {
    return new Map<string, AbstractCapabilityFormControl<ICapabilityModel>>([
      ["array", new ArraySchemaFormControl(new ArraySchemaCapabilityModel("dtmi:com:Example:MyArray;1"), this._formBuilder, this._validationService, this.dialog)], 
      ["boolean", new BooleanSchemaFormControl(new BooleanSchemaCapabilityModel("dtmi:com:Example:MyBoolean;1"), this._formBuilder, this._validationService, this.dialog)], 
      ["date", new DateSchemaFormControl(new DateSchemaCapabilityModel("dtmi:com:Example:MyDate;1"), this._formBuilder, this._validationService, this.dialog)], 
      ["dateTime", new DateTimeSchemaFormControl(new DateTimeSchemaCapabilityModel("dtmi:com:Example:MyDateTime;1"), this._formBuilder, this._validationService, this.dialog)], 
      ["double", new DoubleSchemaFormControl(new DoubleSchemaCapabilityModel("dtmi:com:Example:MyDouble;1"), this._formBuilder, this._validationService, this.dialog)], 
      ["duration", new DurationSchemaFormControl(new DurationSchemaCapabilityModel("dtmi:com:Example:MyDuration;1"), this._formBuilder, this._validationService, this.dialog)], 
      ["enum", new EnumSchemaFormControl(new EnumSchemaCapabilityModel("dtmi:com:Example:MyEnum;1"), this._formBuilder, this._validationService, this.dialog)], 
      ["float", new FloatSchemaFormControl(new FloatSchemaCapabilityModel("dtmi:com:Example:MyFloat;1"), this._formBuilder, this._validationService, this.dialog)], 
      ["integer", new IntegerSchemaFormControl(new IntegerSchemaCapabilityModel("dtmi:com:Example:MyInteger;1"), this._formBuilder, this._validationService, this.dialog)], 
      ["long", new LongSchemaFormControl(new LongSchemaCapabilityModel("dtmi:com:Example:MyLong;1"), this._formBuilder, this._validationService, this.dialog)], 
      ["map", new MapSchemaFormControl(new MapSchemaCapabilityModel<AbstractCapabilityModel, AbstractCapabilityModel>("dtmi:com:Example:MyMap;1", this.createModel("string") as StringSchemaCapabilityModel, this.createModel("string") as StringSchemaCapabilityModel), this._formBuilder, this._validationService, this.dialog)], 
      ["object", new ObjectSchemaFormControl(new ObjectSchemaCapabilityModel("dtmi:com:Example:MyObject;1"), this._formBuilder, this._validationService, this.dialog)], 
      ["string", new StringSchemaFormControl(new StringSchemaCapabilityModel("dtmi:com:Example:MyString;1"), this._formBuilder, this._validationService, this.dialog)], 
      ["time", new TimeSchemaFormControl(new TimeSchemaCapabilityModel("dtmi:com:Example:MyTime;1"), this._formBuilder, this._validationService, this.dialog)]  
    ]);
  }

  // TODO: Get root DTMI path from settings.
  public registerModels(): void {
    this.schemaFactory.registerModel("array", () => new ArraySchemaCapabilityModel("dtmi:com:Example:MyArray;1")); 
    this.schemaFactory.registerModel("boolean", () => new BooleanSchemaCapabilityModel("dtmi:com:Example:MyBoolean;1")); 
    this.schemaFactory.registerModel("date", () => new DateSchemaCapabilityModel("dtmi:com:Example:MyDate;1")); 
    this.schemaFactory.registerModel("dateTime", () => new DateTimeSchemaCapabilityModel("dtmi:com:Example:MyDateTime;1")); 
    this.schemaFactory.registerModel("double", () => new DoubleSchemaCapabilityModel("dtmi:com:Example:MyDouble;1")); 
    this.schemaFactory.registerModel("duration", () => new DurationSchemaCapabilityModel("dtmi:com:Example:MyDuration;1")); 
    this.schemaFactory.registerModel("enum", () => new EnumSchemaCapabilityModel("dtmi:com:Example:MyEnum;1")); 
    this.schemaFactory.registerModel("float", () => new FloatSchemaCapabilityModel("dtmi:com:Example:MyFloat;1")); 
    this.schemaFactory.registerModel("integer", () => new IntegerSchemaCapabilityModel("dtmi:com:Example:MyInteger;1")); 
    this.schemaFactory.registerModel("long", () => new LongSchemaCapabilityModel("dtmi:com:Example:MyLong;1")); 
    this.schemaFactory.registerModel("map", () => new MapSchemaCapabilityModel<AbstractCapabilityModel, AbstractCapabilityModel>("dtmi:com:Example:MyMap;1", this.createModel("string") as StringSchemaCapabilityModel, this.createModel("string") as StringSchemaCapabilityModel)); 
    this.schemaFactory.registerModel("object", () => new ObjectSchemaCapabilityModel("dtmi:com:Example:MyObject;1")); 
    this.schemaFactory.registerModel("string", () => new StringSchemaCapabilityModel("dtmi:com:Example:MyString;1")); 
    this.schemaFactory.registerModel("time", () => new TimeSchemaCapabilityModel("dtmi:com:Example:MyTime;1"));
  }

  public registerMapModels(): void {
    // MapKey can only be string.
    this.schemaFactory.registerModel("stringMapKey", () => new MapKeyCapabilityModel<StringSchemaCapabilityModel>("dtmi:com:Example:MyStringMapKey;1", this.createModel("string") as StringSchemaCapabilityModel)); 

    // MapValues
    this.schemaFactory.registerModel("arrayMapValue", () => new MapValueCapabilityModel<ArraySchemaCapabilityModel>("dtmi:com:Example:MyArrayMapValue;1", this.createModel("array") as ArraySchemaCapabilityModel));
    this.schemaFactory.registerModel("booleanMapValue", () => new MapValueCapabilityModel<BooleanSchemaCapabilityModel>("dtmi:com:Example:MyBooleanMapValue;1", this.createModel("boolean") as BooleanSchemaCapabilityModel)); 
    this.schemaFactory.registerModel("dateMapValue", () => new MapValueCapabilityModel<DateSchemaCapabilityModel>("dtmi:com:Example:MyDateMapValue;1", this.createModel("date") as DateSchemaCapabilityModel)); 
    this.schemaFactory.registerModel("dateTimeMapValue", () => new MapValueCapabilityModel<DateTimeSchemaCapabilityModel>("dtmi:com:Example:MyDateTimeMapValue;1", this.createModel("dateTime") as DateTimeSchemaCapabilityModel)); 
    this.schemaFactory.registerModel("doubleMapValue", () => new MapValueCapabilityModel<DoubleSchemaCapabilityModel>("dtmi:com:Example:MyDoubleMapValue;1", this.createModel("double") as DoubleSchemaCapabilityModel)); 
    this.schemaFactory.registerModel("durationMapValue", () => new MapValueCapabilityModel<DurationSchemaCapabilityModel>("dtmi:com:Example:MyDurationMapValue;1", this.createModel("duration") as DurationSchemaCapabilityModel)); 
    this.schemaFactory.registerModel("enumMapValue", () => new MapValueCapabilityModel<EnumSchemaCapabilityModel>("dtmi:com:Example:MyEnumMapValue;1", this.createModel("enum") as EnumSchemaCapabilityModel)); 
    this.schemaFactory.registerModel("floatMapValue", () => new MapValueCapabilityModel<FloatSchemaCapabilityModel>("dtmi:com:Example:MyFloatMapValue;1", this.createModel("float") as FloatSchemaCapabilityModel)); 
    this.schemaFactory.registerModel("integerMapValue", () => new MapValueCapabilityModel<IntegerSchemaCapabilityModel>("dtmi:com:Example:MyIntegerMapValue;1", this.createModel("integer") as IntegerSchemaCapabilityModel)); 
    this.schemaFactory.registerModel("longMapValue", () => new MapValueCapabilityModel<LongSchemaCapabilityModel>("dtmi:com:Example:MyLongMapValue;1", this.createModel("long") as LongSchemaCapabilityModel));
    this.schemaFactory.registerModel("mapMapValue", () => new MapValueCapabilityModel<MapSchemaCapabilityModel<AbstractCapabilityModel, AbstractCapabilityModel>>("dtmi:com:Example:MyMapMapValue;1", this.createModel("map") as MapSchemaCapabilityModel<AbstractCapabilityModel, AbstractCapabilityModel>)); 
    this.schemaFactory.registerModel("objectMapValue", () => new MapValueCapabilityModel<ObjectSchemaCapabilityModel>("dtmi:com:Example:MyObjectMapValue;1", this.createModel("object") as ObjectSchemaCapabilityModel)); 
    this.schemaFactory.registerModel("stringMapValue", () => new MapValueCapabilityModel<StringSchemaCapabilityModel>("dtmi:com:Example:MyStringMapValue;1", this.createModel("string") as StringSchemaCapabilityModel)); 
    this.schemaFactory.registerModel("timeMapValue", () => new MapValueCapabilityModel<TimeSchemaCapabilityModel>("dtmi:com:Example:MyTimeMapValue;1", this.createModel("time") as TimeSchemaCapabilityModel));
  }

  public registerForms(): void {
    this.schemaFactory.registerFormControl("array", () => new ArraySchemaFormControl(this.createModel("array") as ArraySchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerFormControl("boolean", () => new BooleanSchemaFormControl(this.createModel("boolean") as BooleanSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerFormControl("date", () => new DateSchemaFormControl(this.createModel("date") as DateSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerFormControl("dateTime", () => new DateTimeSchemaFormControl(this.createModel("dateTime") as DateTimeSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerFormControl("double", () => new DoubleSchemaFormControl(this.createModel("double") as DoubleSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerFormControl("duration", () => new DurationSchemaFormControl(this.createModel("duration") as DurationSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerFormControl("enum", () => new EnumSchemaFormControl(this.createModel("enum") as EnumSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerFormControl("float", () => new FloatSchemaFormControl(this.createModel("float") as FloatSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerFormControl("integer", () => new IntegerSchemaFormControl(this.createModel("integer") as IntegerSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerFormControl("long", () => new LongSchemaFormControl(this.createModel("long") as LongSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerFormControl("map", () => new MapSchemaFormControl(this.createModel("map") as MapSchemaCapabilityModel<AbstractCapabilityModel, AbstractCapabilityModel>, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerFormControl("object", () => new ObjectSchemaFormControl(this.createModel("object") as ObjectSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerFormControl("string", () => new StringSchemaFormControl(this.createModel("string") as StringSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerFormControl("time", () => new TimeSchemaFormControl(this.createModel("time") as TimeSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog));
  }

  public registerMapForms(): void {
    // MapKey can only be string.
    this.schemaFactory.registerMapFormControl("MapKey", "string", () => new MapKeyFormControl(this.createModel("stringMapKey") as MapKeyCapabilityModel<StringSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog)); 

    // MapValues
    this.schemaFactory.registerMapFormControl("MapValue", "array", () => new MapValueFormControl(this.createModel("arrayMapValue") as MapValueCapabilityModel<ArraySchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerMapFormControl("MapValue", "boolean", () => new MapValueFormControl(this.createModel("booleanMapValue") as MapValueCapabilityModel<BooleanSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerMapFormControl("MapValue", "date", () => new MapValueFormControl(this.createModel("dateMapValue") as MapValueCapabilityModel<DateSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerMapFormControl("MapValue", "dateTime", () => new MapValueFormControl(this.createModel("dateTimeMapValue") as MapValueCapabilityModel<DateTimeSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerMapFormControl("MapValue", "double", () => new MapValueFormControl(this.createModel("doubleMapValue") as MapValueCapabilityModel<DoubleSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerMapFormControl("MapValue", "duration", () => new MapValueFormControl(this.createModel("durationMapValue") as MapValueCapabilityModel<DurationSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerMapFormControl("MapValue", "enum", () => new MapValueFormControl(this.createModel("enumMapValue") as MapValueCapabilityModel<EnumSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerMapFormControl("MapValue", "float", () => new MapValueFormControl(this.createModel("floatMapValue") as MapValueCapabilityModel<FloatSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerMapFormControl("MapValue", "integer", () => new MapValueFormControl(this.createModel("integerMapValue") as MapValueCapabilityModel<IntegerSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerMapFormControl("MapValue", "long", () => new MapValueFormControl(this.createModel("longMapValue") as MapValueCapabilityModel<LongSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerMapFormControl("MapValue", "map", () => new MapValueFormControl(this.createModel("mapMapValue") as MapValueCapabilityModel<MapSchemaCapabilityModel<AbstractCapabilityModel, AbstractCapabilityModel>>, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerMapFormControl("MapValue", "object", () => new MapValueFormControl(this.createModel("objectMapValue") as MapValueCapabilityModel<ObjectSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerMapFormControl("MapValue", "string", () => new MapValueFormControl(this.createModel("stringMapValue") as MapValueCapabilityModel<StringSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog)); 
    this.schemaFactory.registerMapFormControl("MapValue", "time", () => new MapValueFormControl(this.createModel("timeMapValue") as MapValueCapabilityModel<TimeSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog));
  }

  public createModel(name: string): AbstractCapabilityModel | undefined {
    let model = this.schemaFactory.createModel(name);
    return model;
  }

  public createForm(name: string): AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined {
    let formControl = this.schemaFactory.createFormControl(name);
    return formControl;
  }

  public createMapModel(type: string, name: string): AbstractCapabilityModel | undefined {
    let model = this.schemaFactory.createMapModel(type, name);
    return model;
  }

  public createMapForm(type: string, name: string): AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined {
    let formControl = this.schemaFactory.createMapFormControl(type, name);
    return formControl;
  }

  public addFieldToObjectSchema(objectSchema: ObjectSchemaFormControl): void { 
    let model = new FieldCapabilityModel("dtmi:com:example:MyField;1"); 
    let form = new FieldCapabilityFormControl(model, this._formBuilder, this._validationService);
    objectSchema.fields.push(form);
    objectSchema.model.fields.push(model);
  }

  public addValueToEnumSchema(enumSchema: EnumSchemaFormControl): void { 
    let model = new EnumValueCapabilityModel("dtmi:com:example:MyEnumValue;1"); 
    let form = new EnumValueCapabilityFormControl(model, this._formBuilder, this._validationService, this.dialog);
    enumSchema.enumValues.push(form);
    enumSchema.model.enumValues.push(model);
  }

  public isComplexSchema(form: FormGroup, schemaString: string = 'schema'): boolean {
    let type = form.get(schemaString)?.value?.type;
    if(type && type instanceof Array) type = type[0];
    return ["Array", "Enum", "Map", "Object"].indexOf(type) >= 0;
  }

  public compareSchemas(model1: AbstractCapabilityModel, model2: AbstractCapabilityModel): boolean {
    return model1?.type && model2?.type ? model1.type[0] === model2.type[0] : model1 === model2;
  }
}
