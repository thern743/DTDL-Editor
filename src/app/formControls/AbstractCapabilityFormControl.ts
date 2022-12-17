import { OnDestroy } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { ICapabilityModel } from "../models/ICapabilityModel";
import { ICapabilityFormControl } from "./ICapabilityFormControl";

// TypedJSON requires a concrete type to work.
export abstract class AbstractCapabilityFormControl<TCapabilityDto extends ICapabilityModel>
    implements ICapabilityFormControl<TCapabilityDto>
{    
    public formBuilder: FormBuilder;
    public model!: TCapabilityDto;  
    public form!: FormGroup;
    private _subscriptions: Subscription[];
    
    // TODO: Move setting model and validation service to this ctor from all subclasses.
    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder; 
        this._subscriptions = new Array<Subscription>();       
    }
  
    public abstract toFormGroup(): FormGroup;

    public subscribeModelToForm(): void {
      console.groupCollapsed("Creating Subscriptions");

      Object.keys(this.form.controls).forEach(key => {        
        console.debug(key);

        let control = this.form.controls[key];        
        
        if(!(control instanceof FormArray)) {          
          let subscription = control.valueChanges.subscribe(
            (value) => {
              (<any>this.model)[key] = value;
          }, (error: Error) => {
              console.error("Error in subscription: %o", error);
          });
          this._subscriptions.push(subscription);
        }
      });

      console.groupEnd();
    }

    // TODO: Call this from each component.
    public onDestroy(): void {
      console.groupCollapsed("Unsubscribing");
      this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
      console.groupEnd();
    }
}