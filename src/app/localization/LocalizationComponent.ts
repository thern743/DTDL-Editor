import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";
import { SettingsService } from "../services/settings/settings.service";

export class LocalizationComponent {
  private _formBuilder: FormBuilder;
  public localizationFormGroup: FormGroup;
  private _defaultLocale: string;

  constructor(settingsService: SettingsService, formBuilder: FormBuilder) {
    this._formBuilder = formBuilder;
    this._defaultLocale = settingsService.editorSettings.locale;
    this.localizationFormGroup = this.toFormGroup();
  }

  private toFormGroup(): FormGroup {
    const formGroup = this._formBuilder.group({
      displayName: [""],      
      displayNameLocale: [this._defaultLocale],
      description: [""],
      descriptionLocale: [this._defaultLocale]
    });
    return formGroup;
  }

  protected updateLocalizationCallback(parentForm: AbstractCapabilityFormControl<AbstractCapabilityModel>, result: FormGroup): void {
    if(!result) return;
    this.updateLocalization(parentForm, result, "displayName", "displayNameLocale");
    this.updateLocalization(parentForm, result, "description", "descriptionLocale");
  }
  
  private updateLocalization(
    parentForm: AbstractCapabilityFormControl<AbstractCapabilityModel>, 
    result: FormGroup, 
    formControlName: string,
    localeControlName: string
  ): void {
    const controlArray = result.get(formControlName) as FormArray;

    let newValues: any = {};

    controlArray.controls.forEach((control: AbstractControl) => {
      newValues[control.get("key")?.value] = control.get("value")?.value;
    });

    const firstValue = controlArray?.at(0)?.value;
    
    this.localizationFormGroup.get(localeControlName)?.setValue(firstValue.key);
    this.localizationFormGroup.get(formControlName)?.setValue(firstValue.value);

    parentForm.form?.get(formControlName)?.setValue(newValues);
  }

  public getDisplayNameLocale(): string {
    return this.localizationFormGroup.get("displayNameLocale")?.value;
  }

  public getDescriptionLocale(): string {
    return this.localizationFormGroup.get("descriptionLocale")?.value;
  }
}