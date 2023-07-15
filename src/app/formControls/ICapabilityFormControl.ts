import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { ICapabilityModel } from "../models/interfaces/ICapabilityModel";

export interface ICapabilityFormControl<TCapabilityModel extends ICapabilityModel> {
    formBuilder: UntypedFormBuilder;
    model: TCapabilityModel;  
    form: UntypedFormGroup;   
    toFormGroup(model: TCapabilityModel): UntypedFormGroup;
    subscribeModelToForm(formGroup: UntypedFormGroup): void;
    unsubscribeModelFromForm(): void;
}