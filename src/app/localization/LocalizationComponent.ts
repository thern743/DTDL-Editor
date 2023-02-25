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
    const displayNameArray = result.get("displayName") as FormArray;
    const descriptionArray = result.get("description") as FormArray;

    let newDisplayNameArray: any = {};

    displayNameArray.controls.forEach((control: AbstractControl) => {
      newDisplayNameArray[control.get("key")?.value] = control.get("value")?.value;
    });

    let newDescriptionArray: any = {};

    descriptionArray.controls.forEach((control: AbstractControl) => {
      newDescriptionArray[control.get("key")?.value] = control.get("value")?.value;
    });

    const firstDisplayName = displayNameArray?.at(0)?.value;
    const firstDescription = descriptionArray?.at(0)?.value;

    this.displayNameLocaleControl.setValue(firstDisplayName.key);
    this.displayNameControl.setValue(firstDisplayName.value);
    parentForm.form?.get("displayName")?.setValue(newDisplayNameArray);

    this.descriptionLocaleControl.setValue(firstDescription.key);
    this.descriptionControl.setValue(firstDescription.value);
    parentForm.form?.get("description")?.setValue(newDescriptionArray);
  }
}