import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";

export interface IFormFactory {
    registerForms(type: string, name: string): void;
    createForm(type: string, name: string): AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined;
    getFormsRegistry(): Map<string, Map<string, () => AbstractCapabilityFormControl<AbstractCapabilityModel>>>;
    getModelsRegistry(): Map<string, Map<string, () => AbstractCapabilityModel>>;
}