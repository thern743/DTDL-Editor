import { FormGroup } from "@angular/forms";
import { ICapabilityDto } from "./ICapabilityDto";
import { ICapabilityFormControl } from "./ICapabilityFormControl";

export abstract class AbstractCapabilityFormControl<TCapabilityDto extends ICapabilityDto>
    implements ICapabilityFormControl<TCapabilityDto>
{
    public capability!: TCapabilityDto;

    public abstract toFormGroup(): FormGroup;

    public abstract getValue(): ICapabilityDto;
}