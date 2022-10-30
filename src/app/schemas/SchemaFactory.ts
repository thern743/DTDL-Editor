import { Injectable } from "@angular/core";
import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";
import { ISchemaFactory } from "./ISchemaFactory";

@Injectable({
    providedIn: 'root'
})
export class SchemaFactory implements ISchemaFactory {
    public formRegistry: Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>;
    public modelRegistry: Map<string, () => AbstractCapabilityModel>;
    public mapFormRegistry: Map<string, Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>>;
    public mapModelRegistry: Map<string, Map<string, () => AbstractCapabilityModel>>;

    constructor() {
        this.formRegistry = new Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>();
        this.modelRegistry = new Map<string, () => AbstractCapabilityModel>();
        this.mapFormRegistry = new Map<string, Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>>();
        this.mapModelRegistry = new Map<string, Map<string, () => AbstractCapabilityModel>>();
        this.mapFormRegistry.set("MapKey", new Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>());
        this.mapFormRegistry.set("MapValue", new Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>());
        this.mapModelRegistry.set("MapKey", new Map<string, () => AbstractCapabilityModel>());
        this.mapModelRegistry.set("MapValue", new Map<string, () => AbstractCapabilityModel>());
    }

    // ***** IBasicSchemaFactory *****
    public registerFormControl(name: string, factory: () => AbstractCapabilityFormControl<AbstractCapabilityModel>): void {
        this.formRegistry.set(name, factory);
    }

    public createFormControl(name: string): AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined {
        let func = this.formRegistry.get(name);
        return func === undefined ? undefined : func();
    }

    public registerModel(name: string, factory: () => AbstractCapabilityModel): void {
        this.modelRegistry.set(name, factory);
    }

    public createModel(name: string): AbstractCapabilityModel | undefined{
        let func = this.modelRegistry.get(name);
        return func === undefined ? undefined : func();
    }

    // ***** IMapSchemaFactory *****
    public registerMapFormControl(type: string, name: string, factory: () => AbstractCapabilityFormControl<AbstractCapabilityModel>): void {        
        let map = this.mapFormRegistry.get(type);                
        map?.set(name, factory);
    }

    public createMapFormControl(type: string, name: string): AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined {
        let func = this.mapFormRegistry.get(type)?.get(name);
        return func === undefined ? undefined : func();
    }
    
    public registerMapModel(type: string, name: string, factory: () => AbstractCapabilityModel): void {
        let map = this.mapModelRegistry.get(type);
        map?.set(name, factory);
    }
    
    public createMapModel(type: string, name: string): AbstractCapabilityModel | undefined {
        let func = this.mapModelRegistry.get(type)?.get(name);
        return func === undefined ? undefined : func();
    }
}