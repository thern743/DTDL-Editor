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

    constructor() {
        this.formRegistry = new Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>();
        this.modelRegistry = new Map<string, () => AbstractCapabilityModel>();
    }

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
}