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
import { SchemaFactory } from 'src/app/schemas/SchemaFactory';
import { MapKeyFormControl } from 'src/app/formControls/MapKeyFormControl';
import { MapValueFormControl } from 'src/app/formControls/MapValueFormControl';
import { ISchemaFactory } from 'src/app/schemas/ISchemaFactory';
import { SchemaTypeEnum } from 'src/app/models/SchemaTypeEnum';
import { AbstractSchemaModel } from 'src/app/models/AbstractSchemaModel';
import { CommandPayload } from 'src/app/models/CommandPayload';
import { CommandPayloadFormControl } from 'src/app/formControls/CommandPayloadFormControl';

// TODO: Move schema factory methods to the controls responsible for creating them
//       Currently, `SchemaService` is responsible for registering each model and form control
//       which requires knowledge of each model and form class. Instead, each model and form
//       class should expose a factory method that can be registered during startup using reflection.
@Injectable({
  providedIn: 'root'
})
export class SchemaService implements IFormFactory, IModelFactory {
  private _schemaFactory: ISchemaFactory;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;
  public dialog: MatDialog;


  constructor(schemaFactory: SchemaFactory, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
    this._schemaFactory = schemaFactory;
    this._formBuilder = formBuilder;
    this._validationService = validationService;
    this.dialog = dialog;

  }

  // TODO: Use base DTMI from SettingsService when calling factory methods
  //       Currently the DTMI ids are hard-coded in the factory methods for creating capability models.
  //       We should instead construct the URI from the SettingsService.  

  // TODO: Call factory methods instead of hard-coded new() when retrieving schema types
  //       `SchemaService.getSchemaTypesFormControls()` currently creates a Map<Key, Value> 
  //       where `Value` is constructed from explicitly calling new() ctors. This should be switch
  //       to either calling the `SchemaFactory` methods or have the calling controls use `SchemaFactory`
  //       directly.    
  public getSchemaTypesFormControls(): Map<string, AbstractCapabilityFormControl<AbstractCapabilityModel>> {
    return new Map<string, AbstractCapabilityFormControl<AbstractCapabilityModel>>([
      ["boolean", new BooleanSchemaFormControl(new BooleanSchemaCapabilityModel("dtmi:com:Example:MyBoolean;1"), this._formBuilder, this._validationService, this.dialog)],
      ["date", new DateSchemaFormControl(new DateSchemaCapabilityModel("dtmi:com:Example:MyDate;1"), this._formBuilder, this._validationService, this.dialog)],
      ["dateTime", new DateTimeSchemaFormControl(new DateTimeSchemaCapabilityModel("dtmi:com:Example:MyDateTime;1"), this._formBuilder, this._validationService, this.dialog)],
      ["double", new DoubleSchemaFormControl(new DoubleSchemaCapabilityModel("dtmi:com:Example:MyDouble;1"), this._formBuilder, this._validationService, this.dialog)],
      ["duration", new DurationSchemaFormControl(new DurationSchemaCapabilityModel("dtmi:com:Example:MyDuration;1"), this._formBuilder, this._validationService, this.dialog)],
      ["float", new FloatSchemaFormControl(new FloatSchemaCapabilityModel("dtmi:com:Example:MyFloat;1"), this._formBuilder, this._validationService, this.dialog)],
      ["integer", new IntegerSchemaFormControl(new IntegerSchemaCapabilityModel("dtmi:com:Example:MyInteger;1"), this._formBuilder, this._validationService, this.dialog)],
      ["long", new LongSchemaFormControl(new LongSchemaCapabilityModel("dtmi:com:Example:MyLong;1"), this._formBuilder, this._validationService, this.dialog)],
      ["string", new StringSchemaFormControl(new StringSchemaCapabilityModel("dtmi:com:Example:MyString;1"), this._formBuilder, this._validationService, this.dialog)],
      ["time", new TimeSchemaFormControl(new TimeSchemaCapabilityModel("dtmi:com:Example:MyTime;1"), this._formBuilder, this._validationService, this.dialog)],

      ["array", new ArraySchemaFormControl(new ArraySchemaCapabilityModel("dtmi:com:Example:MyArray;1"), this._formBuilder, this._validationService, this.dialog)],
      ["enum", new EnumSchemaFormControl(new EnumSchemaCapabilityModel("dtmi:com:Example:MyEnum;1"), this._formBuilder, this._validationService, this.dialog)],
      ["map", new MapSchemaFormControl(new MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>("dtmi:com:Example:MyMap;1"), this._formBuilder, this._validationService, this.dialog)],
      ["object", new ObjectSchemaFormControl(new ObjectSchemaCapabilityModel("dtmi:com:Example:MyObject;1"), this._formBuilder, this._validationService, this.dialog)]
    ]);
  }

  public registerModels(): void {
    this._schemaFactory.registerModel("Primitive", "boolean", () => new BooleanSchemaCapabilityModel("dtmi:com:Example:MyBoolean;1"));
    this._schemaFactory.registerModel("Primitive", "date", () => new DateSchemaCapabilityModel("dtmi:com:Example:MyDate;1"));
    this._schemaFactory.registerModel("Primitive", "dateTime", () => new DateTimeSchemaCapabilityModel("dtmi:com:Example:MyDateTime;1"));
    this._schemaFactory.registerModel("Primitive", "double", () => new DoubleSchemaCapabilityModel("dtmi:com:Example:MyDouble;1"));
    this._schemaFactory.registerModel("Primitive", "duration", () => new DurationSchemaCapabilityModel("dtmi:com:Example:MyDuration;1"));
    this._schemaFactory.registerModel("Primitive", "float", () => new FloatSchemaCapabilityModel("dtmi:com:Example:MyFloat;1"));
    this._schemaFactory.registerModel("Primitive", "integer", () => new IntegerSchemaCapabilityModel("dtmi:com:Example:MyInteger;1"));
    this._schemaFactory.registerModel("Primitive", "long", () => new LongSchemaCapabilityModel("dtmi:com:Example:MyLong;1"));
    this._schemaFactory.registerModel("Primitive", "string", () => new StringSchemaCapabilityModel("dtmi:com:Example:MyString;1"));
    this._schemaFactory.registerModel("Primitive", "time", () => new TimeSchemaCapabilityModel("dtmi:com:Example:MyTime;1"));

    this._schemaFactory.registerModel("Complex", "array", () => new ArraySchemaCapabilityModel("dtmi:com:Example:MyArray;1"));
    this._schemaFactory.registerModel("Complex", "enum", () => new EnumSchemaCapabilityModel("dtmi:com:Example:MyEnum;1"));
    this._schemaFactory.registerModel("Complex", "map", () => new MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>("dtmi:com:Example:MyMap;1"));
    this._schemaFactory.registerModel("Complex", "object", () => new ObjectSchemaCapabilityModel("dtmi:com:Example:MyObject;1"));

    this._schemaFactory.registerModel("Utility", "commandPayload", () => new CommandPayload("dtmi:com:Example:MyCommandPayload;1"));

    this.registerMapModels();
  }

  public registerForms(): void {
    this._schemaFactory.registerFormControl("Primitive", "boolean", () => new BooleanSchemaFormControl(this.createModel("Primitive", "boolean") as BooleanSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("Primitive", "date", () => new DateSchemaFormControl(this.createModel("Primitive", "date") as DateSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("Primitive", "dateTime", () => new DateTimeSchemaFormControl(this.createModel("Primitive", "dateTime") as DateTimeSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("Primitive", "double", () => new DoubleSchemaFormControl(this.createModel("Primitive", "double") as DoubleSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("Primitive", "duration", () => new DurationSchemaFormControl(this.createModel("Primitive", "duration") as DurationSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("Primitive", "float", () => new FloatSchemaFormControl(this.createModel("Primitive", "float") as FloatSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("Primitive", "integer", () => new IntegerSchemaFormControl(this.createModel("Primitive", "integer") as IntegerSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("Primitive", "long", () => new LongSchemaFormControl(this.createModel("Primitive", "long") as LongSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("Primitive", "string", () => new StringSchemaFormControl(this.createModel("Primitive", "string") as StringSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("Primitive", "time", () => new TimeSchemaFormControl(this.createModel("Primitive", "time") as TimeSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog));

    this._schemaFactory.registerFormControl("Complex", "array", () => new ArraySchemaFormControl(this.createModel("Complex", "array") as ArraySchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("Complex", "enum", () => new EnumSchemaFormControl(this.createModel("Complex", "enum") as EnumSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("Complex", "map", () => new MapSchemaFormControl(this.createModel("Complex", "map") as MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("Complex", "object", () => new ObjectSchemaFormControl(this.createModel("Complex", "object") as ObjectSchemaCapabilityModel, this._formBuilder, this._validationService, this.dialog)); 

    this._schemaFactory.registerFormControl("Utility", "commandPayload", () => new CommandPayloadFormControl(this.createModel("Utility", "commandPayload") as CommandPayload, this._formBuilder, this._validationService));

    this.registerMapForms();
  }

  private registerMapModels(): void {
    // MapKey can only be string.
    this._schemaFactory.registerModel("MapKey", "string", () => new MapKeyCapabilityModel<StringSchemaCapabilityModel>("dtmi:com:Example:MyStringMapKey;1", this.createModel("Primitive", "string") as StringSchemaCapabilityModel));

    // MapValues
    this._schemaFactory.registerModel("MapValue", "boolean", () => new MapValueCapabilityModel<BooleanSchemaCapabilityModel>("dtmi:com:Example:MyBooleanMapValue;1", this.createModel("Primitive", "boolean") as BooleanSchemaCapabilityModel));
    this._schemaFactory.registerModel("MapValue", "date", () => new MapValueCapabilityModel<DateSchemaCapabilityModel>("dtmi:com:Example:MyDateMapValue;1", this.createModel("Primitive", "date") as DateSchemaCapabilityModel));
    this._schemaFactory.registerModel("MapValue", "dateTime", () => new MapValueCapabilityModel<DateTimeSchemaCapabilityModel>("dtmi:com:Example:MyDateTimeMapValue;1", this.createModel("Primitive", "dateTime") as DateTimeSchemaCapabilityModel));
    this._schemaFactory.registerModel("MapValue", "double", () => new MapValueCapabilityModel<DoubleSchemaCapabilityModel>("dtmi:com:Example:MyDoubleMapValue;1", this.createModel("Primitive", "double") as DoubleSchemaCapabilityModel));
    this._schemaFactory.registerModel("MapValue", "duration", () => new MapValueCapabilityModel<DurationSchemaCapabilityModel>("dtmi:com:Example:MyDurationMapValue;1", this.createModel("Primitive", "duration") as DurationSchemaCapabilityModel));
    this._schemaFactory.registerModel("MapValue", "float", () => new MapValueCapabilityModel<FloatSchemaCapabilityModel>("dtmi:com:Example:MyFloatMapValue;1", this.createModel("Primitive", "float") as FloatSchemaCapabilityModel));
    this._schemaFactory.registerModel("MapValue", "integer", () => new MapValueCapabilityModel<IntegerSchemaCapabilityModel>("dtmi:com:Example:MyIntegerMapValue;1", this.createModel("Primitive", "integer") as IntegerSchemaCapabilityModel));
    this._schemaFactory.registerModel("MapValue", "long", () => new MapValueCapabilityModel<LongSchemaCapabilityModel>("dtmi:com:Example:MyLongMapValue;1", this.createModel("Primitive", "long") as LongSchemaCapabilityModel));
    this._schemaFactory.registerModel("MapValue", "string", () => new MapValueCapabilityModel<StringSchemaCapabilityModel>("dtmi:com:Example:MyStringMapValue;1", this.createModel("Primitive", "string") as StringSchemaCapabilityModel));
    this._schemaFactory.registerModel("MapValue", "time", () => new MapValueCapabilityModel<TimeSchemaCapabilityModel>("dtmi:com:Example:MyTimeMapValue;1", this.createModel("Primitive", "time") as TimeSchemaCapabilityModel));

    this._schemaFactory.registerModel("MapValue", "array", () => new MapValueCapabilityModel<ArraySchemaCapabilityModel>("dtmi:com:Example:MyArrayMapValue;1", this.createModel("Complex", "array") as ArraySchemaCapabilityModel));
    this._schemaFactory.registerModel("MapValue", "enum", () => new MapValueCapabilityModel<EnumSchemaCapabilityModel>("dtmi:com:Example:MyEnumMapValue;1", this.createModel("Complex", "enum") as EnumSchemaCapabilityModel));
    this._schemaFactory.registerModel("MapValue", "map", () => new MapValueCapabilityModel<MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>>("dtmi:com:Example:MyMapMapValue;1", this.createModel("Complex", "map") as MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>));
    this._schemaFactory.registerModel("MapValue", "object", () => new MapValueCapabilityModel<ObjectSchemaCapabilityModel>("dtmi:com:Example:MyObjectMapValue;1", this.createModel("Complex", "object") as ObjectSchemaCapabilityModel));
  }

  private registerMapForms(): void {
    // MapKey can only be string.
    this._schemaFactory.registerFormControl("MapKey", "string", () => new MapKeyFormControl(this.createModel("MapKey", "string") as MapKeyCapabilityModel<StringSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog));

    // MapValues
    this._schemaFactory.registerFormControl("MapValue", "boolean", () => new MapValueFormControl(this.createModel("MapValue", "boolean") as MapValueCapabilityModel<BooleanSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("MapValue", "date", () => new MapValueFormControl(this.createModel("MapValue", "date") as MapValueCapabilityModel<DateSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("MapValue", "dateTime", () => new MapValueFormControl(this.createModel("MapValue", "dateTime") as MapValueCapabilityModel<DateTimeSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("MapValue", "double", () => new MapValueFormControl(this.createModel("MapValue", "double") as MapValueCapabilityModel<DoubleSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("MapValue", "duration", () => new MapValueFormControl(this.createModel("MapValue", "duration") as MapValueCapabilityModel<DurationSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("MapValue", "float", () => new MapValueFormControl(this.createModel("MapValue", "float") as MapValueCapabilityModel<FloatSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("MapValue", "integer", () => new MapValueFormControl(this.createModel("MapValue", "integer") as MapValueCapabilityModel<IntegerSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("MapValue", "long", () => new MapValueFormControl(this.createModel("MapValue", "long") as MapValueCapabilityModel<LongSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("MapValue", "object", () => new MapValueFormControl(this.createModel("MapValue", "object") as MapValueCapabilityModel<ObjectSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("MapValue", "time", () => new MapValueFormControl(this.createModel("MapValue", "time") as MapValueCapabilityModel<TimeSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog));

    this._schemaFactory.registerFormControl("MapValue", "array", () => new MapValueFormControl(this.createModel("MapValue", "array") as MapValueCapabilityModel<ArraySchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("MapValue", "enum", () => new MapValueFormControl(this.createModel("MapValue", "enum") as MapValueCapabilityModel<EnumSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("MapValue", "map", () => new MapValueFormControl(this.createModel("MapValue", "map") as MapValueCapabilityModel<MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>>, this._formBuilder, this._validationService, this.dialog));
    this._schemaFactory.registerFormControl("MapValue", "string", () => new MapValueFormControl(this.createModel("MapValue", "string") as MapValueCapabilityModel<StringSchemaCapabilityModel>, this._formBuilder, this._validationService, this.dialog));
  }

  public createModel(type: string, name: string): AbstractCapabilityModel | undefined {
    let model = this._schemaFactory.createModel(type, name);
    return model;
  }

  public createForm(type: string, name: string): AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined {
    let formControl = this._schemaFactory.createFormControl(type, name);
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
    if (type && type instanceof Array) type = type[0];
    return ["array", "enum", "map", "object"].indexOf(type?.toLowerCase()) >= 0;
  }

  public getSchemaTypeEnum(schema: string): SchemaTypeEnum {
    return ["array", "enum", "map", "object"].indexOf(schema?.toLowerCase()) >= 0 ? SchemaTypeEnum.Complex : SchemaTypeEnum.Primitive;
  }

  public compareSchemas(model1: AbstractCapabilityModel, model2: AbstractCapabilityModel): boolean {
    return model1?.type && model2?.type ? model1.type[0].toLowerCase() === model2.type[0].toLowerCase() : model1 === model2;
  }

  public getFormsRegistry(): Map<string, Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>> {
    return this._schemaFactory.getFormsRegistry();
  }

  public getModelsRegistry(): Map<string, Map<string, () => AbstractCapabilityModel>> {
    return this._schemaFactory.getModelsRegistry();
  }

  public getSchemaTypes(): Array<string> {
    let schemaTypes = new Array<string>();

    this._schemaFactory.getFormsRegistry().get("Primitive")?.forEach((value, key) => {
      schemaTypes.push(key);
    });

    this._schemaFactory.getModelsRegistry().get("Complex")?.forEach((value, key) => {
      schemaTypes.push(key);
    });

    return schemaTypes;
  }

  public openSchemaEditor(parentForm: FormGroup, schemaFormControl: AbstractCapabilityFormControl<AbstractCapabilityModel>): void {
    var schemaModel = schemaFormControl?.model;
    let componentType = schemaModel?.resolveSchemaComponentType();

    this.dialog
      .open(componentType,
        {
          data: schemaFormControl,
          height: "60%",
          width: "50%"
        })
      .afterClosed()
      .subscribe((result: FormGroup) => {
        if (result) {
          // TODO: Parent form's schema attribute name is hard-coded  
          //      Not all schema forms have a schema value of "schema" ((e.g. EnumValue)
          //      so if these parent controls call `openSchemaEditor()` their schema values
          //      will not be set correctly. Right now this doesn't seem to be an issue since
          //      none of the affected types are calling `openSchemaEditor()`;
          parentForm?.get("schema")?.setValue(result);
        }
      });
  }
}
