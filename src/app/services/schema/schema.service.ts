import { Injectable } from '@angular/core';
import { FieldCapabilityFormControl } from '../../formControls/FieldCapabilityFormControl';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from '../validation/validation-service.service';
import { FieldCapabilityModel } from '../../models/FieldCapabilityModel';
import { MatDialog } from '@angular/material/dialog';
import { AbstractCapabilityModel } from '../../models/AbstractCapabilityModel';
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

@Injectable({
  providedIn: 'root'
})
export class SchemaService implements IFormFactory, IModelFactory {
  private _validationService: ValidationService;
  private _settingsService: SettingsService;
  private _formBuilder: FormBuilder;
  public dialog: MatDialog;

  constructor(validationService: ValidationService, settingsService: SettingsService, formBuilder: FormBuilder, dialog: MatDialog) {
    this._validationService = validationService;
    this._settingsService = settingsService;
    this._formBuilder = formBuilder;
    this.dialog = dialog;
  }

  public createModel(type: string, name: string): AbstractCapabilityModel | undefined {
    const modelFunc = SchemaFactory.createModel(type, name);
    if (modelFunc == undefined) return;
    const model = modelFunc(this._settingsService.buildDtmi(`New_${type}_${name}`));
    return model;
  }

  public createForm(type: string, name: string): AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined {
    const formControlFunc = SchemaFactory.createFormControl(type, name);
    if (formControlFunc == undefined) return;
    const model = this.createModel(type, name);
    if (model == undefined) return;
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

  public getFormsRegistry(): Map<string, Map<string, (model: AbstractCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) => AbstractCapabilityFormControl<AbstractCapabilityModel>>> {
    return SchemaFactory.getFormsRegistry();
  }

  public getModelsRegistry(): Map<string, Map<string, (id: string) => AbstractCapabilityModel>> {
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

  public openSchemaEditor(parentForm: FormGroup, schemaFormControl: AbstractCapabilityFormControl<AbstractCapabilityModel>): void {
    var schemaModel = schemaFormControl?.model;
    const componentType = schemaModel?.resolveSchemaComponentType();

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
