import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";

export interface IPrimitiveSchemaFactory {
    getFormsRegistry(): Map<string, Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>>;
    getModelsRegistry(): Map<string, Map<string, () => AbstractCapabilityModel>>;
    registerFormControl(type: string, name: string, factory: () => AbstractCapabilityFormControl<AbstractCapabilityModel>): void;
    createFormControl(type: string, name: string): AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined;
    registerModel(type: string, name: string, factory: () => AbstractCapabilityModel): void;
    createModel(type: string, name: string): AbstractCapabilityModel | undefined;
}