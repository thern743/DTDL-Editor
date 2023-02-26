import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapabilityModel } from "../models/interfaces/ICapabilityModel";

export interface ICapabilityFormControl<TCapabilityModel extends ICapabilityModel> {
    formBuilder: FormBuilder;
    model: TCapabilityModel;  
    form: FormGroup;   
    toFormGroup(model: TCapabilityModel): FormGroup;
    subscribeModelToForm(formGroup: FormGroup): void;
}