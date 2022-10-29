import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { MapSchemaFormControl } from '../formControls/MapSchemaFormControl';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';
import { ISchemaEditor } from '../models/ISchemaEditor';
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
  public keySchemaTypes: Map<string, AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined>;
  public valueSchemaTypes: Map<string, AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined>;

  constructor(schemaService: SchemaService,
    formBuilder: FormBuilder, 
    validationService: ValidationService, 
    dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: MapSchemaCapabilityModel<AbstractCapabilityModel, AbstractCapabilityModel>
  ) { 
    this.schemaService = schemaService;
    this._formBuilder = formBuilder;
    this._validationService = validationService;
    this.dialog = dialog;
    this.map = new MapSchemaFormControl(data, this._formBuilder, this._validationService, this.dialog);
    this.keySchemaTypes = new Map<string, AbstractCapabilityFormControl<AbstractCapabilityModel>>();
    this.valueSchemaTypes = new Map<string, AbstractCapabilityFormControl<AbstractCapabilityModel>>();
    this.mapKeysAndValues();
  }

  public ngOnInit(): void { 
    this.map.subscribeModelToForm();
  }

  private mapKeysAndValues(): void {
    this.schemaService.schemaFactory.formRegistry.forEach((value, key) => {
      this.keySchemaTypes.set(key, undefined);
      this.valueSchemaTypes.set(key, undefined);
    });
  }

  public changeMapKey($event: MatSelectChange): void {
    let formControl = this.schemaService.createForm($event.value);
    if(formControl === undefined) return;
    let schema = this.map.form.get("mapKey.schema");
    if(schema === undefined || schema === null) return;
    schema.setValue(formControl.form);  
  }

  public changeMapValue($event: MatSelectChange): void {
    let formControl = this.schemaService.createForm($event.value);
    if(formControl === undefined) return;
    let schema = this.map.form.get("mapValue.schema");
    if(schema === undefined || schema === null) return;
    schema.setValue(formControl.form);
  }

  public openKeyEditor(type: string, schemaName: string = "schema"): void {
    let form = this.keySchemaTypes.get(type.toLowerCase());
    if(form === undefined) return;    
    // TODO: This is a hack. Figure out a better solution.
    (<ISchemaEditor><unknown>form).openSchemaEditor(this.map.mapKey.form, schemaName);
  }

  public openValueEditor(type: string, schemaName: string = "schema"): void {
    let form = this.valueSchemaTypes.get(type.toLowerCase());
    if(form === undefined) return;
    // TODO: This is a hack. Figure out a better solution.
    (<ISchemaEditor><unknown>form).openSchemaEditor(this.map.mapValue.form, schemaName);
  }

  // TODO: New these up at selection time.
  // public getValueSchemaTypes(): void {
  //   this.schemaService.schemaFactory.registerModel("arrayMap", () => new MapValueCapabilityModel<ArraySchemaCapabilityModel>("dtmi:com:Example:MyArray;1")); 
  //   this.schemaService.schemaFactory.registerModel("booleanMap", () => new MapValueCapabilityModel<BooleanSchemaCapabilityModel>("dtmi:com:Example:MyBoolean;1")); 
  //   this.schemaService.schemaFactory.registerModel("dateMap", () => new MapValueCapabilityModel<DateSchemaCapabilityModel>("dtmi:com:Example:MyDate;1")); 
  //   this.schemaService.schemaFactory.registerModel("dateTimeMap", () => new MapValueCapabilityModel<DateTimeSchemaCapabilityModel>("dtmi:com:Example:MyDateTime;1")); 
  //   this.schemaService.schemaFactory.registerModel("doubleMap", () => new MapValueCapabilityModel<DoubleSchemaCapabilityModel>("dtmi:com:Example:MyDouble;1")); 
  //   this.schemaService.schemaFactory.registerModel("durationMap", () => new MapValueCapabilityModel<DurationSchemaCapabilityModel>("dtmi:com:Example:MyDuration;1")); 
  //   this.schemaService.schemaFactory.registerModel("enumMap", () => new MapValueCapabilityModel<EnumSchemaCapabilityModel>("dtmi:com:Example:MyEnum;1")); 
  //   this.schemaService.schemaFactory.registerModel("floatMap", () => new MapValueCapabilityModel<FloatSchemaCapabilityModel>("dtmi:com:Example:MyFloat;1")); 
  //   this.schemaService.schemaFactory.registerModel("integerMap", () => new MapValueCapabilityModel<IntegerSchemaCapabilityModel>("dtmi:com:Example:MyInteger;1")); 
  //   this.schemaService.schemaFactory.registerModel("longMap", () => new MapValueCapabilityModel<LongSchemaCapabilityModel>("dtmi:com:Example:MyLong;1")); 
  //   this.schemaService.schemaFactory.registerModel("mapMap", () => new MapValueCapabilityModel<MapSchemaCapabilityModel>("dtmi:com:Example:MyMap;1")); 
  //   this.schemaService.schemaFactory.registerModel("objectMap", () => new MapValueCapabilityModel<ObjectSchemaCapabilityModel>("dtmi:com:Example:MyObject;1")); 
  //   this.schemaService.schemaFactory.registerModel("stringMap", () => new MapValueCapabilityModel<StringSchemaCapabilityModel>("dtmi:com:Example:MyString;1")); 
  //   this.schemaService.schemaFactory.registerModel("timeMap", () => new MapValueCapabilityModel<TimeSchemaCapabilityModel>("dtmi:com:Example:MyTime;1"));

  //   this.schemaService.schemaFactory.registerForm("arrayMap", () => new MapValueFormControl(this.getModel("arrayMap"), this._formBuilder, this._validationService, this.dialog)); 
  //   this.schemaService.schemaFactory.registerForm("booleanMap", () => new MapValueCapabilityModel<BooleanSchemaCapabilityModel>("dtmi:com:Example:MyBoolean;1")); 
  //   this.schemaService.schemaFactory.registerForm("dateMap", () => new MapValueCapabilityModel<DateSchemaCapabilityModel>("dtmi:com:Example:MyDate;1")); 
  //   this.schemaService.schemaFactory.registerForm("dateTimeMap", () => new MapValueCapabilityModel<DateTimeSchemaCapabilityModel>("dtmi:com:Example:MyDateTime;1")); 
  //   this.schemaService.schemaFactory.registerForm("doubleMap", () => new MapValueCapabilityModel<DoubleSchemaCapabilityModel>("dtmi:com:Example:MyDouble;1")); 
  //   this.schemaService.schemaFactory.registerForm("durationMap", () => new MapValueCapabilityModel<DurationSchemaCapabilityModel>("dtmi:com:Example:MyDuration;1")); 
  //   this.schemaService.schemaFactory.registerForm("enumMap", () => new MapValueCapabilityModel<EnumSchemaCapabilityModel>("dtmi:com:Example:MyEnum;1")); 
  //   this.schemaService.schemaFactory.registerForm("floatMap", () => new MapValueCapabilityModel<FloatSchemaCapabilityModel>("dtmi:com:Example:MyFloat;1")); 
  //   this.schemaService.schemaFactory.registerForm("integerMap", () => new MapValueCapabilityModel<IntegerSchemaCapabilityModel>("dtmi:com:Example:MyInteger;1")); 
  //   this.schemaService.schemaFactory.registerForm("longMap", () => new MapValueCapabilityModel<LongSchemaCapabilityModel>("dtmi:com:Example:MyLong;1")); 
  //   this.schemaService.schemaFactory.registerForm("mapMap", () => new MapValueCapabilityModel<MapSchemaCapabilityModel>("dtmi:com:Example:MyMap;1")); 
  //   this.schemaService.schemaFactory.registerForm("objectMap", () => new MapValueCapabilityModel<ObjectSchemaCapabilityModel>("dtmi:com:Example:MyObject;1")); 
  //   this.schemaService.schemaFactory.registerForm("stringMap", () => new MapValueCapabilityModel<StringSchemaCapabilityModel>("dtmi:com:Example:MyString;1")); 
  //   this.schemaService.schemaFactory.registerForm("timeMap", () => new MapValueCapabilityModel<TimeSchemaCapabilityModel>("dtmi:com:Example:MyTime;1"));

  //   // return new Map<string, AbstractCapabilityFormControl<ICapabilityModel>>([
  //   //   ["array", new MapValueFormControl(new MapValueCapabilityModel<ArraySchemaCapabilityModel>("dtmi:com:Example:MyArray;1"), this._formBuilder, this._validationService, this.dialog)], 
  //   //   ["boolean", new MapValueFormControl(new MapValueCapabilityModel<ArraySchemaCapabilityModel>("dtmi:com:Example:MyBoolean;1"), this._formBuilder, this._validationService, this.dialog)], 
  //   //   ["date", new MapValueFormControl(new MapValueCapabilityModel<ArraySchemaCapabilityModel>("dtmi:com:Example:MyDate;1"), this._formBuilder, this._validationService, this.dialog)], 
  //   //   ["dateTime", new MapValueFormControl(new MapValueCapabilityModel<ArraySchemaCapabilityModel>("dtmi:com:Example:MyDateTime;1"), this._formBuilder, this._validationService, this.dialog)], 
  //   //   ["double", new MapValueFormControl(new MapValueCapabilityModel<ArraySchemaCapabilityModel>("dtmi:com:Example:MyDouble;1"), this._formBuilder, this._validationService, this.dialog)], 
  //   //   ["duration", new MapValueFormControl(new MapValueCapabilityModel<ArraySchemaCapabilityModel>("dtmi:com:Example:MyDuration;1"), this._formBuilder, this._validationService, this.dialog)], 
  //   //   ["enum", new MapValueFormControl(new MapValueCapabilityModel<ArraySchemaCapabilityModel>("dtmi:com:Example:MyEnum;1"), this._formBuilder, this._validationService, this.dialog)], 
  //   //   ["float", new MapValueFormControl(new MapValueCapabilityModel<ArraySchemaCapabilityModel>("dtmi:com:Example:MyFloat;1"), this._formBuilder, this._validationService, this.dialog)], 
  //   //   ["integer", new MapValueFormControl(new MapValueCapabilityModel<ArraySchemaCapabilityModel>("dtmi:com:Example:MyInteger;1"), this._formBuilder, this._validationService, this.dialog)], 
  //   //   ["long", new MapValueFormControl(new MapValueCapabilityModel<ArraySchemaCapabilityModel>("dtmi:com:Example:MyLong;1"), this._formBuilder, this._validationService, this.dialog)], 
  //   //   ["map", new MapValueFormControl(new MapValueCapabilityModel<ArraySchemaCapabilityModel>("dtmi:com:Example:MyMap;1"), this._formBuilder, this._validationService, this.dialog)], 
  //   //   ["object", new MapValueFormControl(new MapValueCapabilityModel<ArraySchemaCapabilityModel>("dtmi:com:Example:MyObject;1"), this._formBuilder, this._validationService, this.dialog)], 
  //   //   ["string", new MapValueFormControl(new MapValueCapabilityModel<ArraySchemaCapabilityModel>("dtmi:com:Example:MyString;1"), this._formBuilder, this._validationService, this.dialog)], 
  //   //   ["time", new MapValueFormControl(new MapValueCapabilityModel<ArraySchemaCapabilityModel>("dtmi:com:Example:MyTime;1"), this._formBuilder, this._validationService, this.dialog)]  
  //   // ]);
  // }

  // public getSchemaTypesFormControls(): Map<string, () => AbstractCapabilityFormControl<ICapabilityModel>> {
  //   return new Map<string, () => AbstractCapabilityFormControl<ICapabilityModel>>([
  //     ["array", () => new ArraySchemaFormControl(new ArraySchemaCapabilityModel("dtmi:com:Example:MyArray;1"), this._formBuilder, this._validationService, this.dialog)], 
  //     ["boolean", () => new BooleanSchemaFormControl(new BooleanSchemaCapabilityModel("dtmi:com:Example:MyBoolean;1"), this._formBuilder, this._validationService, this.dialog)], 
  //     ["date", () => new DateSchemaFormControl(new DateSchemaCapabilityModel("dtmi:com:Example:MyDate;1"), this._formBuilder, this._validationService, this.dialog)], 
  //     ["dateTime", () => new DateTimeSchemaFormControl(new DateTimeSchemaCapabilityModel("dtmi:com:Example:MyDateTime;1"), this._formBuilder, this._validationService, this.dialog)], 
  //     ["double", () => new DoubleSchemaFormControl(new DoubleSchemaCapabilityModel("dtmi:com:Example:MyDouble;1"), this._formBuilder, this._validationService, this.dialog)], 
  //     ["duration", () => new DurationSchemaFormControl(new DurationSchemaCapabilityModel("dtmi:com:Example:MyDuration;1"), this._formBuilder, this._validationService, this.dialog)], 
  //     ["enum", () => new EnumSchemaFormControl(new EnumSchemaCapabilityModel("dtmi:com:Example:MyEnum;1"), this._formBuilder, this._validationService, this.dialog)], 
  //     ["float", () => new FloatSchemaFormControl(new FloatSchemaCapabilityModel("dtmi:com:Example:MyFloat;1"), this._formBuilder, this._validationService, this.dialog)], 
  //     ["integer", () => new IntegerSchemaFormControl(new IntegerSchemaCapabilityModel("dtmi:com:Example:MyInteger;1"), this._formBuilder, this._validationService, this.dialog)], 
  //     ["long", () => new LongSchemaFormControl(new LongSchemaCapabilityModel("dtmi:com:Example:MyLong;1"), this._formBuilder, this._validationService, this.dialog)], 
  //     ["map", () => new MapSchemaFormControl(new MapSchemaCapabilityModel("dtmi:com:Example:MyMap;1"), this._formBuilder, this._validationService, this.dialog)], 
  //     ["object", () => new ObjectSchemaFormControl(new ObjectSchemaCapabilityModel("dtmi:com:Example:MyObject;1"), this._formBuilder, this._validationService, this.dialog)], 
  //     ["string", () => new StringSchemaFormControl(new StringSchemaCapabilityModel("dtmi:com:Example:MyString;1"), this._formBuilder, this._validationService, this.dialog)], 
  //     ["time", () => new TimeSchemaFormControl(new TimeSchemaCapabilityModel("dtmi:com:Example:MyTime;1"), this._formBuilder, this._validationService, this.dialog)]  
  //   ]);
  // }

  // private getKeySchemaTypes(): Map<string, AbstractCapabilityFormControl<MapKeyCapabilityModel>> {
  //   return new Map<string, AbstractCapabilityFormControl<MapKeyCapabilityModel>>([
  //     ["string", new MapKeyFormControl(new MapKeyCapabilityModel("dtmi:com:Example:MyMapKey;1"), this._formBuilder, this._validationService, this.dialog)]
  //   ]);
  // }

  // private getModel(name: string): AbstractCapabilityModel | undefined {
  //   let form = this.schemaService.schemaFactory.createModel(name);
  //   return form;
  // } 
}
