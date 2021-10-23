import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapabilityDto } from "./ICapabilityDto";

export interface ICapabilityFormControl<TCapabilityDto extends ICapabilityDto> { 
    index: number;
    formBuilder: FormBuilder;
    capability: TCapabilityDto;  
    form: FormGroup;   
    toFormGroup(): FormGroup;
    getValue(): ICapabilityDto;
}