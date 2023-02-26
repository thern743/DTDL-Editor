import { OnDestroy } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { ICapabilityModel } from "../models/interfaces/ICapabilityModel";
import { ICapabilityFormControl } from "./ICapabilityFormControl";

// TypedJSON requires a concrete type to work.
export abstract class AbstractCapabilityFormControl<TCapabilityModel extends ICapabilityModel>
    implements ICapabilityFormControl<TCapabilityModel>
{    
    public formBuilder: FormBuilder;
    public model!: TCapabilityModel;  
    public form!: FormGroup;
    private _subscriptions: Subscription[];
    
    // TODO: Move common services to the AbstractCapabilityFormControl base class
    //       Currently, all subclasses have their own private instances of common services. E.g., `ValidationService`.
    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder; 
        this._subscriptions = new Array<Subscription>();       
    }
  
    public abstract toFormGroup(model: TCapabilityModel): FormGroup;

    public subscribeModelToForm(formGroup: FormGroup): void {
      console.groupCollapsed("Creating Subscriptions");

      Object.keys(formGroup.controls).forEach(key => {        
        console.debug(key);

        let control = formGroup.controls[key];        
        
        if(control instanceof FormGroup) {
          this.subscribeModelToForm(control);
        } else if(!(control instanceof FormArray)) {          
          this.createSubscription(control, key);
        }
      });

      console.groupEnd();
    }

    private createSubscription(control: AbstractControl, key: string): void {
      let subscription = control.valueChanges.subscribe(
        (value) => {
          (<any>this.model)[key] = value;
      }, (error: Error) => {
          console.error("Error in subscription: %o", error);
      });
      this._subscriptions.push(subscription);
    }

    // TODO: Each form component should implement OnDestroy lifecycle hook
    //       Each form-based component implements `AbstractCapabilityFormControl.subscribeModelToForm()`. 
    //       These components should call `AbstractCapabilityFormControl.onDestroy()` to unsubscribe cleanly via the OnDestroy()
    //       component lifecycle hook.
    public onDestroy(): void {
      console.groupCollapsed("Unsubscribing");
      this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
      console.groupEnd();
    }
}