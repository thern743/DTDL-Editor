import { Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";
import { ValidationService } from "../services/validation/validation-service.service";

@Injectable({
  providedIn: 'root'
})
export class SchemaFactory {
  private static formRegistry: Map<string, Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>>
                        = new Map<string, Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>>();
  private static modelRegistry: Map<string, Map<string, () => AbstractCapabilityModel>> 
                        = new Map<string, Map<string, () => AbstractCapabilityModel>>();
  public static initialize() {
    SchemaFactory.modelRegistry.set("Primitive", new Map<string, () => AbstractCapabilityModel>());
    SchemaFactory.modelRegistry.set("Complex", new Map<string, () => AbstractCapabilityModel>());
    SchemaFactory.modelRegistry.set("Utility", new Map<string, () => AbstractCapabilityModel>());
    SchemaFactory.modelRegistry.set("MapKey", new Map<string, () => AbstractCapabilityModel>());
    SchemaFactory.modelRegistry.set("MapValue", new Map<string, () => AbstractCapabilityModel>());

    SchemaFactory.formRegistry.set("Primitive", new Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>());
    SchemaFactory.formRegistry.set("Complex", new Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>());
    SchemaFactory.formRegistry.set("Utility", new Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>());
    SchemaFactory.formRegistry.set("MapKey", new Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>());
    SchemaFactory.formRegistry.set("MapValue", new Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>());
  }

  public static registerFormControl(type: string, name: string, factory: () => AbstractCapabilityFormControl<AbstractCapabilityModel>): void {
    let map = SchemaFactory.formRegistry.get(type);
    map?.set(name, factory);
  }

  public static createFormControl(type: string, name: string): ((model: AbstractCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) => AbstractCapabilityFormControl<AbstractCapabilityModel>) | undefined {
    let func = SchemaFactory.formRegistry.get(type)?.get(name);
    return func === undefined ? undefined : func;
  }

  public static registerModel(type: string, name: string, factory: () => AbstractCapabilityModel): void {
    let map = SchemaFactory.modelRegistry.get(type);
    map?.set(name, factory);
  }

  public static createModel(type: string, name: string): ((id: string) => AbstractCapabilityModel) | undefined {
    let func = SchemaFactory.modelRegistry.get(type)?.get(name);
    return func === undefined ? undefined : func;
  }

  public static getFormsRegistry(): Map<string, Map<string, (model: AbstractCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) => AbstractCapabilityFormControl<AbstractCapabilityModel>>> {
    return SchemaFactory.formRegistry;
  }

  public static getModelsRegistry(): Map<string, Map<string, (id: string) => AbstractCapabilityModel>> {
    return SchemaFactory.modelRegistry;
  }
}