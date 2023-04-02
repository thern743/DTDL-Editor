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
import { SchemaModalComponent } from 'src/app/schema-modal/schema-modal.component';
import { AbstractSchemaModel } from 'src/app/models/AbstractSchemaModel';
import { SchemaModalParameters } from 'src/app/models/SchemaModalParameters';
import { SchemaModalResult } from 'src/app/models/SchemaModalResult';
import { EditorService } from '../editor/editor.service';
import { AbstractCapabilityModel } from 'src/app/models/AbstractCapabilityModel';

@Injectable({
  providedIn: 'root'
})
export class SchemaService implements IFormFactory, IModelFactory {
  private _editorService: EditorService
  private _validationService: ValidationService;
  private _settingsService: SettingsService;
  private _formBuilder: UntypedFormBuilder;
  public dialog: MatDialog;

  constructor(editorService: EditorService, validationService: ValidationService, settingsService: SettingsService, formBuilder: UntypedFormBuilder, dialog: MatDialog) {
    this._editorService = editorService;
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

  public createForm(type: string, name: string): AbstractCapabilityFormControl<AbstractSchemaModel> | undefined {
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

  public isComplexSchema(form: UntypedFormGroup, schemaString: string = 'schema'): boolean {
    let type = form.get(schemaString)?.value?.type;
    if (type && type instanceof Array) type = type[0];
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

  public openSchemaEditor(capabilityForm: AbstractCapabilityFormControl<AbstractCapabilityModel>, schemaFormControl: AbstractCapabilityFormControl<AbstractSchemaModel>): void {
    const schemaType = schemaFormControl?.model["@type"];
    const isInterfaceSchema = this._editorService.getInterfaceSchemaIndex(capabilityForm.interface, schemaFormControl) > -1;
    const modalParameters = new SchemaModalParameters(schemaType, schemaType.toLowerCase(), schemaFormControl, isInterfaceSchema);

    this.dialog
      .open(SchemaModalComponent,
        {
          data: modalParameters,
          height: "80%",
          width: "60%"
        })
      .afterClosed()
      .subscribe((result: SchemaModalResult) => {
        if (result) {
          // TODO: Parent form's schema attribute name is hard-coded  
          //      Not all schema forms have a schema value of "schema" ((e.g. EnumValue)
          //      so if these parent controls call `openSchemaEditor()` their schema values
          //      will not be set correctly. Right now this doesn't seem to be an issue since
          //      none of the affected types are calling `openSchemaEditor()`;

          if(result.interfaceSchema) {
            this._editorService.addOrUpdateInterfaceSchema(capabilityForm.interface, result.schemaFormControl);
            capabilityForm?.form.get("schema")?.setValue(result.schemaFormControl.model["@id"]);
          } else {
            capabilityForm?.form.get("schema")?.setValue(result.schemaFormControl.model);
          }
        }
      });
  }
}
