import { Injectable } from "@angular/core";
import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";
import { ISchemaFactory } from "./ISchemaFactory";

@Injectable({
    providedIn: 'root'
})
export class SchemaFactory implements ISchemaFactory {
    public formRegistry: Map<string, Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>>;
    public modelRegistry: Map<string, Map<string, () => AbstractCapabilityModel>>;

    constructor() {
        this.formRegistry = new Map<string, Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>>();
        this.modelRegistry = new Map<string, Map<string, () => AbstractCapabilityModel>>();
        
        // TODO: Dynamically set keys for formRegistry and modelRegistry maps
        //       Once a proper factory pattern has been setup for registering models and forms,
        //       `SchemaFactory` should no longer need to have hard-coded keys.
        this.modelRegistry.set("Primitive", new Map<string, () => AbstractCapabilityModel>());
        this.modelRegistry.set("Complex", new Map<string, () => AbstractCapabilityModel>());
        this.modelRegistry.set("MapKey", new Map<string, () => AbstractCapabilityModel>());
        this.modelRegistry.set("MapValue", new Map<string, () => AbstractCapabilityModel>());

        this.formRegistry.set("Primitive", new Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>());
        this.formRegistry.set("Complex", new Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>());
        this.formRegistry.set("MapKey", new Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>());
        this.formRegistry.set("MapValue", new Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>());
    }

    // ***** IMapSchemaFactory *****
    public registerFormControl(type: string, name: string, factory: () => AbstractCapabilityFormControl<AbstractCapabilityModel>): void {        
        let map = this.formRegistry.get(type);                
        map?.set(name, factory);
    }

    public createFormControl(type: string, name: string): AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined {
        let func = this.formRegistry.get(type)?.get(name);
        return func === undefined ? undefined : func();
    }
    
    public registerModel(type: string, name: string, factory: () => AbstractCapabilityModel): void {
        let map = this.modelRegistry.get(type);
        map?.set(name, factory);
    }
    
    public createModel(type: string, name: string): AbstractCapabilityModel | undefined {
        let func = this.modelRegistry.get(type)?.get(name);
        return func === undefined ? undefined : func();
    }
}