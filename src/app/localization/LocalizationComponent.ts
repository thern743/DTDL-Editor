import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";

export class LocalizationComponent {
  public displayNameControl: FormControl = new FormControl();
  public displayNameLocaleControl: FormControl = new FormControl();
  public descriptionLocaleControl: FormControl = new FormControl();
  public descriptionControl: FormControl = new FormControl();

  protected updateLocalizationCallback(parentForm: AbstractCapabilityFormControl<AbstractCapabilityModel>, result: FormGroup): void {
    if(!result) return;
    this.updateLocalization(parentForm, result, "displayName", this.displayNameLocaleControl, this.displayNameControl);
    this.updateLocalization(parentForm, result, "description", this.descriptionLocaleControl, this.descriptionControl);
  }
  
  private updateLocalization(parentForm: AbstractCapabilityFormControl<AbstractCapabilityModel>, 
    result: FormGroup, 
    controlName: string,
    localeControl: FormControl,
    displayControl: FormControl
  ): void {
    const controlArray = result.get(controlName) as FormArray;

    let newValues: any = {};

    controlArray.controls.forEach((control: AbstractControl) => {
      newValues[control.get("key")?.value] = control.get("value")?.value;
    });

    const firstValue = controlArray?.at(0)?.value;
    
    localeControl.setValue(firstValue.key);
    displayControl.setValue(firstValue.value);
    parentForm.form?.get(controlName)?.setValue(newValues);
  }
}