import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { AbstractCapabilityFormControl } from "src/app/formControls/AbstractCapabilityFormControl";
import { AbstractCapabilityModel } from "src/app/models/AbstractCapabilityModel";
import { LocalizationService } from "src/app/services/localization/localization.service";
import { SettingsService } from "src/app/services/settings/settings.service";

@Component({
  selector: 'display-name-description',
  templateUrl: './display-name-description.component.html',
  styleUrls: ['./display-name-description.component.scss']
})
export class DisplayNameDescriptionComponent implements OnInit {
  @Input() public formGroupControl!: AbstractCapabilityFormControl<AbstractCapabilityModel>;
  @Input() public formIndex: number = -1;

  private _localizationService: LocalizationService;
  private _formBuilder: FormBuilder;
  public localizationFormGroup: FormGroup;
  private _defaultLocale: string;

  constructor(settingsService: SettingsService, localizationService: LocalizationService, formBuilder: FormBuilder) {
    this._localizationService = localizationService;
    this._formBuilder = formBuilder;
    this._defaultLocale = settingsService.editorSettings.locale;
    this.localizationFormGroup = this.toFormGroup();
  }

  public ngOnInit(): void {

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

  public getLocaleFor(controlName: string): string {
    return this.localizationFormGroup.get(controlName)?.value;
  }

  public openDisplayNameDescriptionLanguageMap(): void {
    this._localizationService.openDisplayNameDescriptionLanguageMap(this.formGroupControl, this.updateLocalizationCallback.bind(this));
  }
}