import { Injectable } from "@angular/core";
import { UntypedFormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractSchemaModel } from "../models/AbstractSchemaModel";
import { ValidationService } from "../services/validation/validation-service.service";
import { SchemaService } from "../services/schema/schema.service";

@Injectable({
  providedIn: 'root'
})
export class SchemaFactory {
  private static formRegistry: Map<string, Map<string, () => AbstractCapabilityFormControl<AbstractSchemaModel>>>
                        = new Map<string, Map<string, () => AbstractCapabilityFormControl<AbstractSchemaModel>>>();
  private static modelRegistry: Map<string, Map<string, () => AbstractSchemaModel>> 
                        = new Map<string, Map<string, () => AbstractSchemaModel>>();
  public static initialize() {
    SchemaFactory.modelRegistry.set("Primitive", new Map<string, () => AbstractSchemaModel>());
    SchemaFactory.modelRegistry.set("Complex", new Map<string, () => AbstractSchemaModel>());
    SchemaFactory.modelRegistry.set("Utility", new Map<string, () => AbstractSchemaModel>());
    SchemaFactory.modelRegistry.set("MapKey", new Map<string, () => AbstractSchemaModel>());
    SchemaFactory.modelRegistry.set("MapValue", new Map<string, () => AbstractSchemaModel>());

    SchemaFactory.formRegistry.set("Primitive", new Map<string, () => AbstractCapabilityFormControl<AbstractSchemaModel>>());
    SchemaFactory.formRegistry.set("Complex", new Map<string, () => AbstractCapabilityFormControl<AbstractSchemaModel>>());
    SchemaFactory.formRegistry.set("Utility", new Map<string, () => AbstractCapabilityFormControl<AbstractSchemaModel>>());
    SchemaFactory.formRegistry.set("MapKey", new Map<string, () => AbstractCapabilityFormControl<AbstractSchemaModel>>());
    SchemaFactory.formRegistry.set("MapValue", new Map<string, () => AbstractCapabilityFormControl<AbstractSchemaModel>>());
  }

  public static registerFormControl(type: string, name: string, factory: () => AbstractCapabilityFormControl<AbstractSchemaModel>): void {
    let map = SchemaFactory.formRegistry.get(type);
    map?.set(name, factory);
  }

  public static createFormControl(type: string, name: string): ((model: AbstractSchemaModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) => AbstractCapabilityFormControl<AbstractSchemaModel>) | undefined {
    let func = SchemaFactory.formRegistry.get(type)?.get(name);
    return func === undefined ? undefined : func;
  }

  public static createMapFormControl(type: string, name: string): ((model: AbstractSchemaModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => AbstractCapabilityFormControl<AbstractSchemaModel>) | undefined {
    let func = SchemaFactory.formRegistry.get(type)?.get(name);
    return func === undefined ? undefined : func;
  }

  public static registerModel(type: string, name: string, factory: () => AbstractSchemaModel): void {
    let map = SchemaFactory.modelRegistry.get(type);
    map?.set(name, factory);
  }

  public static createModel(type: string, name: string): ((id: string) => AbstractSchemaModel) | undefined {
    let func = SchemaFactory.modelRegistry.get(type)?.get(name);
    return func === undefined ? undefined : func;
  }

  public static createMapModel(type: string, name: string): ((id: string, schema: AbstractSchemaModel) => AbstractSchemaModel) | undefined {
    let func = SchemaFactory.modelRegistry.get(type)?.get(name);
    return func === undefined ? undefined : func;
  }

  public static getFormsRegistry(): Map<string, Map<string, (model: AbstractSchemaModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) => AbstractCapabilityFormControl<AbstractSchemaModel>>> {
    return SchemaFactory.formRegistry;
  }

  public static getModelsRegistry(): Map<string, Map<string, (id: string) => AbstractSchemaModel>> {
    return SchemaFactory.modelRegistry;
  }
}