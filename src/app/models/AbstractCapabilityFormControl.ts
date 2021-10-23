import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapabilityDto } from "./ICapabilityDto";
import { ICapabilityFormControl } from "./ICapabilityFormControl";

// TypedJSON requires a concrete type to work.
export abstract class AbstractCapabilityFormControl<TCapabilityDto extends ICapabilityDto>
    implements ICapabilityFormControl<TCapabilityDto>
{
    public index: number = -1;
    public formBuilder: FormBuilder;
    public capability!: TCapabilityDto;  
    public form!: FormGroup;
    
    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
    }

    public abstract toFormGroup(): FormGroup;
    public abstract getValue(): ICapabilityDto;
}