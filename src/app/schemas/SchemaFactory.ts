import { Injectable } from "@angular/core";
import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";
import { ISchemaFactory } from "./ISchemaFactory";

@Injectable({
  providedIn: 'root'
})
export class SchemaFactory implements ISchemaFactory {
  private _formRegistry: Map<string, Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>>;
  private _modelRegistry: Map<string, Map<string, () => AbstractCapabilityModel>>;

  constructor() {
    this._formRegistry = new Map<string, Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>>();
    this._modelRegistry = new Map<string, Map<string, () => AbstractCapabilityModel>>();

    // TODO: Dynamically set keys for formRegistry and modelRegistry maps
    //       Once a proper factory pattern has been setup for registering models and forms,
    //       `SchemaFactory` should no longer need to have hard-coded keys.
    this._modelRegistry.set("Primitive", new Map<string, () => AbstractCapabilityModel>());
    this._modelRegistry.set("Complex", new Map<string, () => AbstractCapabilityModel>());
    this._modelRegistry.set("Utility", new Map<string, () => AbstractCapabilityModel>());
    this._modelRegistry.set("MapKey", new Map<string, () => AbstractCapabilityModel>());
    this._modelRegistry.set("MapValue", new Map<string, () => AbstractCapabilityModel>());

    this._formRegistry.set("Primitive", new Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>());
    this._formRegistry.set("Complex", new Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>());
    this._formRegistry.set("Utility", new Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>());
    this._formRegistry.set("MapKey", new Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>());
    this._formRegistry.set("MapValue", new Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>());
  }

  public registerFormControl(type: string, name: string, factory: () => AbstractCapabilityFormControl<AbstractCapabilityModel>): void {
    let map = this._formRegistry.get(type);
    map?.set(name, factory);
  }

  public createFormControl(type: string, name: string): AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined {
    let func = this._formRegistry.get(type)?.get(name);
    return func === undefined ? undefined : func();
  }

  public registerModel(type: string, name: string, factory: () => AbstractCapabilityModel): void {
    let map = this._modelRegistry.get(type);
    map?.set(name, factory);
  }

  public createModel(type: string, name: string): AbstractCapabilityModel | undefined {
    let func = this._modelRegistry.get(type)?.get(name);
    return func === undefined ? undefined : func();
  }

  public getFormsRegistry(): Map<string, Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>> {
    return this._formRegistry;
  }

  public getModelsRegistry(): Map<string, Map<string, () => AbstractCapabilityModel>> {
    return this._modelRegistry;
  }
}