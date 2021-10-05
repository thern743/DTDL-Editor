import { FormGroup } from "@angular/forms";

export interface ICapability {
    index: number;
    id: string;
    type: string;
    name: string;
    displayName: string;
    description: string;
    comment: string;
    toFormGroup(): FormGroup;
    getValue(): ICapability;
}