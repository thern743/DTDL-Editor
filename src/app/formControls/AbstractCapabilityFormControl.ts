import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ICapabilityModel } from "../models/ICapabilityModel";
import { ICapabilityFormControl } from "./ICapabilityFormControl";

// TypedJSON requires a concrete type to work.
export abstract class AbstractCapabilityFormControl<TCapabilityDto extends ICapabilityModel>
    implements ICapabilityFormControl<TCapabilityDto>
{    
    public formBuilder: FormBuilder;
    public model!: TCapabilityDto;  
    public form!: FormGroup;
    
    // TODO: Move setting model and validation service to this ctor from all subclasses.
    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;        
    }

    public abstract toFormGroup(): FormGroup;

    public subscribeModelToForm(): void {
      console.groupCollapsed("Creating Subscriptions");

      Object.keys(this.form.controls).forEach(key => {        
        console.debug(key);

        let control = this.form.controls[key];        
        
        if(!(control instanceof FormArray)) {          
          control.valueChanges.subscribe(
            (value) => {
              (<any>this.model)[key] = value;
          }, (error: Error) => {
              console.error("Error in subscription: %o", error);
          });
        }
      });

      console.groupEnd();
    }
}