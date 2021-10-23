import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapabilityModel } from "../models/ICapabilityModel";

export interface ICapabilityFormControl<TCapabilityModel extends ICapabilityModel> { 
    index: number;
    formBuilder: FormBuilder;
    model: TCapabilityModel;  
    form: FormGroup;   
    toFormGroup(): FormGroup;
    getValue(): ICapabilityModel;
    subscribe(): void;
}