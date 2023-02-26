import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { ValidationService } from "../services/validation/validation-service.service";
import { ICapabilityFormControl } from "./ICapabilityFormControl";

// TypedJSON requires a concrete type to work.
export abstract class AbstractFormControl<TCapabilityModel> implements ICapabilityFormControl<any>
{
    protected _validationService: ValidationService;    
    public formBuilder: FormBuilder;
    public model!: TCapabilityModel;  
    public form!: FormGroup;
    private _subscriptions: Array<Subscription>;
    
    constructor(validationService: ValidationService, formBuilder: FormBuilder) {
        this._validationService = validationService;
        this.formBuilder = formBuilder; 
        this._subscriptions = new Array<Subscription>();       
    }
  
    public abstract toFormGroup(model: TCapabilityModel): FormGroup;

    public subscribeModelToForm(formGroup: FormGroup): void {
      console.groupCollapsed("Creating Inner Subscriptions");

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
    
    public onDestroy(): void {
      console.groupCollapsed("Unsubscribing");
      this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
      console.groupEnd();
    }
}