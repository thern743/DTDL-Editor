import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";

export interface IMapSchemaFactory {
    // map[type][name] = func()
    mapFormRegistry: Map<string, Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>>;
    mapModelRegistry: Map<string, Map<string, () => AbstractCapabilityModel>>;
    registerMapFormControl(type: string, name: string, factory: () => AbstractCapabilityFormControl<AbstractCapabilityModel>): void;
    createMapFormControl(type: string, name: string): AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined;
    registerMapModel(type: string, name: string, factory: () => AbstractCapabilityModel): void;
    createMapModel(type: string, name: string): AbstractCapabilityModel | undefined;
}