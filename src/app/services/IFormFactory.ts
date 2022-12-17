import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";

export interface IFormFactory {
    registerForms(type: string, name: string): void;
    createForm(type: string, name: string): AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined;
}