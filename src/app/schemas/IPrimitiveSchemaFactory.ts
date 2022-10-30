import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";

export interface IPrimitiveSchemaFactory {
    formRegistry: Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>;
    modelRegistry: Map<string, () => AbstractCapabilityModel>;
    registerFormControl(name: string, factory: () => AbstractCapabilityFormControl<AbstractCapabilityModel>): void;
    createFormControl(name: string): AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined;
    registerModel(name: string, factory: () => AbstractCapabilityModel): void;
    createModel(name: string): AbstractCapabilityModel | undefined;
}