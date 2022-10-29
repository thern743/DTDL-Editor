import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";

export interface IFormFactory {
    registerForms(name: string): void;
    createForm(name: string): AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined;
}