import { AbstractCapabilityFormControl } from "./AbstractCapabilityFormControl";
import { ICapabilityDto } from "./ICapabilityDto";
import { ICapabilityFormControl } from "./ICapabilityFormControl";

export interface IDtdlComponent {
    getProperty(capability: ICapabilityFormControl<ICapabilityDto>): AbstractCapabilityFormControl<ICapabilityDto>;
}