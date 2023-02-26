import { FormBuilder, FormGroup } from "@angular/forms";

export interface IFormControl<TAny> {
    formBuilder: FormBuilder;
    model: TAny;  
    form: FormGroup;   
    toFormGroup(model: TAny): FormGroup;
    subscribeModelToForm(formGroup: FormGroup): void;
}