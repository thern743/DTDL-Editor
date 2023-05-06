import { Injectable } from '@angular/core';
import { FieldCapabilityFormControl } from '../../formControls/FieldCapabilityFormControl';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ValidationService } from '../validation/validation-service.service';
import { FieldCapabilityModel } from '../../models/FieldCapabilityModel';
import { MatDialog } from '@angular/material/dialog';
import { AbstractCapabilityFormControl } from '../../formControls/AbstractCapabilityFormControl';
import { EnumValueCapabilityFormControl } from '../../formControls/EnumValueCapabilityFormControl';
import { EnumValueCapabilityModel } from '../../models/EnumValueCapabilityModel';
import { IFormFactory } from '../IFormFactory';
import { IModelFactory } from '../IModelFactory';
import { SchemaFactory } from '../../schemas/SchemaFactory';
import { SchemaTypeEnum } from '../../models/SchemaTypeEnum';
import { SettingsService } from '../settings/settings.service';
import { EnumSchemaFormControl } from '../../formControls/schemas/EnumSchemaFormControl';
import { ObjectSchemaFormControl } from '../../formControls/schemas/ObjectSchemaFormControl';
import { AbstractSchemaModel } from 'src/app/models/AbstractSchemaModel';

@Injectable({
  providedIn: 'root'
})
export class SchemaService implements IFormFactory, IModelFactory {
  public dialog: MatDialog;
  private _validationService: ValidationService;
  private _settingsService: SettingsService;
  private _formBuilder: UntypedFormBuilder;

  constructor(validationService: ValidationService, settingsService: SettingsService, formBuilder: UntypedFormBuilder, dialog: MatDialog) {
    this._validationService = validationService;
    this._settingsService = settingsService;
    this._formBuilder = formBuilder;
    this.dialog = dialog;
  }

  public createModel(type: string, name: string): AbstractSchemaModel | undefined {
    const modelFunc = SchemaFactory.createModel(type, name);
    if (modelFunc == undefined) return;
    const model = modelFunc(this._settingsService.buildDtmi(`New_${type}_${name}`));
    return model;
  }

  public createMapModel(type: string, name: string): AbstractSchemaModel | undefined {
    const schemaType = this.getSchemaTypeEnum(name);
    const subModelFunc = SchemaFactory.createModel(SchemaTypeEnum[schemaType], name);
    if (subModelFunc == undefined) return;
    const subModel = subModelFunc(this._settingsService.buildDtmi(`New_${type}_${name}`));
    const modelFunc = SchemaFactory.createMapModel(type, name);
    if (modelFunc == undefined) return;
    const model = modelFunc(this._settingsService.buildDtmi(`New_${type}`), subModel);
    return model;
  }

  public createForm(type: string, name: string): AbstractCapabilityFormControl<AbstractSchemaModel> | undefined {
    const formControlFunc = SchemaFactory.createFormControl(type, name);
    if (formControlFunc == undefined) return;
    const model = this.createModel(type, name);
    if (model == undefined) return;
    const formControl = formControlFunc(model, this._formBuilder, this._validationService, this.dialog);
    return formControl;
  }

  public createMapForm(type: string, name: string): AbstractCapabilityFormControl<AbstractSchemaModel> | undefined {
    const formControlFunc = SchemaFactory.createMapFormControl(type, name);
    if (formControlFunc == undefined) return;
    const model = this.createMapModel(type, name);
    if (model == undefined) return;
    const formControl = formControlFunc(model, this._formBuilder, this._validationService, this, this.dialog);
    return formControl;
  }

  public createFormWithModel(type: string, name: string, model: AbstractSchemaModel): AbstractCapabilityFormControl<AbstractSchemaModel> | undefined {
    if (model == undefined) return;
    const formControlFunc = SchemaFactory.createFormControl(type, name);
    if (formControlFunc == undefined) return;
    const formControl = formControlFunc(model, this._formBuilder, this._validationService, this.dialog);
    return formControl;
  }

  public addFieldToObjectSchema(objectSchema: ObjectSchemaFormControl): void {
    const model = new FieldCapabilityModel(this._settingsService.buildDtmi("New_Field"));
    const form = new FieldCapabilityFormControl(model, this._formBuilder, this._validationService);
    objectSchema.fields.push(form);
    objectSchema.model.fields.push(model);
  }

  public addValueToEnumSchema(enumSchema: EnumSchemaFormControl): void {
    const model = new EnumValueCapabilityModel(this._settingsService.buildDtmi("New_EnumValue"));
    const form = new EnumValueCapabilityFormControl(model, this._formBuilder, this._validationService, this.dialog);
    enumSchema.enumValues.push(form);
    enumSchema.model.enumValues.push(model);
  }

  public isComplexSchema(form: UntypedFormGroup, schemaString: string = 'schema'): boolean {
    let type = form.get(schemaString)?.value?.type;
    if (type && type instanceof Array) type = type[0];
    return this.isComplexSchemaByType(type);
  }

  public isComplexSchemaByType(type: string): boolean {
    return ["array", "enum", "map", "object"].indexOf(type?.toLowerCase()) >= 0;
  }

  public getSchemaTypeEnum(schema: string): SchemaTypeEnum {
    return ["array", "enum", "map", "object"].indexOf(schema?.toLowerCase()) >= 0 ? SchemaTypeEnum.Complex : SchemaTypeEnum.Primitive;
  }

  public compareSchemas(model1: AbstractSchemaModel, model2: AbstractSchemaModel): boolean {
    return model1["@type"] && model2["@type"] ? model1["@type"][0].toLowerCase() === model2["@type"][0].toLowerCase() : model1 === model2;
  }

  public getFormsRegistry(): Map<string, Map<string, (model: AbstractSchemaModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) => AbstractCapabilityFormControl<AbstractSchemaModel>>> {
    return SchemaFactory.getFormsRegistry();
  }

  public getModelsRegistry(): Map<string, Map<string, (id: string) => AbstractSchemaModel>> {
    return SchemaFactory.getModelsRegistry();
  }

  public getSchemaTypes(): Array<string> {
    const schemaTypes = new Array<string>();

    SchemaFactory.getFormsRegistry().get("Primitive")?.forEach((value, key) => {
      schemaTypes.push(key);
    });

    SchemaFactory.getModelsRegistry().get("Complex")?.forEach((value, key) => {
      schemaTypes.push(key);
    });

    return schemaTypes;
  }

  public getSchemaFormControl(schema: string | AbstractSchemaModel): AbstractCapabilityFormControl<AbstractSchemaModel> | undefined
  {
    if (!schema) return;
    
    let type: string[];

    if (typeof schema === "string")
      return undefined; //type = new Array<string>(schema);
    else  
      type = typeof schema["@type"] === 'string' ? new Array<string>(schema["@type"]) : schema["@type"];

    if (type == undefined) return;

    // TODO: Do not assume that the first element is the schema type and not an annotation.
    const schemaType = type[0].toLocaleLowerCase();
    const group = this.isComplexSchemaByType(schemaType) ? "Complex" : "Primitive"; 

    const formControl = this.createFormWithModel(group, schemaType, schema);
    if (!formControl) throw new Error("Invalid schema type '" + schemaType + "'");
    return formControl;
  }
}
