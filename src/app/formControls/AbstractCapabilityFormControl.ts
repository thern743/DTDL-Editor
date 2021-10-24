import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ICapabilityModel } from "../models/ICapabilityModel";
import { ICapabilityFormControl } from "./ICapabilityFormControl";

// TypedJSON requires a concrete type to work.
export abstract class AbstractCapabilityFormControl<TCapabilityDto extends ICapabilityModel>
    implements ICapabilityFormControl<TCapabilityDto>
{
    public index: number = -1;
    public formBuilder: FormBuilder;
    public model!: TCapabilityDto;  
    public form!: FormGroup;
    
    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;        
    }

    public abstract toFormGroup(): FormGroup;
    public abstract getValue(): ICapabilityModel;

    public subscribeModelToForm(): void {
      Object.keys(this.form.controls).forEach(key => {
        console.debug("Creating subscription for: '" + key + "'");

        let control = this.form.controls[key];        
        
        if(!(control instanceof FormArray)) {          
          control.valueChanges.subscribe(
            (value) => {
              (<any>this.model)[key] = value;
              console.log("Value changed to " + value);                        
          }, (error) => {
              console.error("Error in subscription: " + error);
          });
        }
      });
    }
}