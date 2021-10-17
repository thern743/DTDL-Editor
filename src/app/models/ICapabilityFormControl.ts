import { FormGroup } from "@angular/forms";
import { ICapabilityDto } from "./ICapabilityDto";

export interface ICapabilityFormControl<TCapabilityDto extends ICapabilityDto> {    
    capability: TCapabilityDto;
    toFormGroup(): FormGroup;
    getValue(): ICapabilityDto;
}

