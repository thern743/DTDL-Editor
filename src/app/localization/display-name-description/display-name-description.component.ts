import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormArray, FormGroup } from "@angular/forms";
import { LocalizationFormControl } from "src/app/formControls/LocalizationFormControl";
import { LanguageMap } from "src/app/models/LanguageMap";
import { LocalizationService } from "src/app/services/localization/localization.service";
import { LanguageMapComponent } from "../language-map/language-map.component";

@Component({
  selector: 'display-name-description',
  templateUrl: './display-name-description.component.html',
  styleUrls: ['./display-name-description.component.scss']
})
export class DisplayNameDescriptionComponent implements OnInit {
  @ViewChild("displayNameComponent") displayNameComponent!: LanguageMapComponent;
  @ViewChild("descriptionComponent") descriptionComponent!: LanguageMapComponent;
  public displayNameFormArray!: FormArray;
  public descriptionFormArray!: FormArray;
  @Input() parentFormGroup!: FormGroup;
  @Input() public formGroupControl!: LocalizationFormControl;
  @Input() public formIndex: number = -1;
  private _localizationService: LocalizationService;

  constructor(localizationService: LocalizationService) {
    this._localizationService = localizationService;
  }

  public ngOnInit(): void {
    this.formGroupControl.subscribeModelToForm(this.formGroupControl.form);
  }

  protected updateLocalizationCallback(parentFormGroup: FormGroup, result: FormGroup): void {
    if(!result) return;
    this.displayNameFormArray = result.get("displayName") as FormArray;
    this.updateLocalization(parentFormGroup, result, "displayName");

    this.descriptionFormArray = result.get("description") as FormArray;
    this.updateLocalization(parentFormGroup, result, "description");
  }
  
  private updateLocalization(
    parentFormGroup: FormGroup, 
    result: FormGroup, 
    formControlName: string
  ): void {
    const controlArray = result.get(formControlName) as FormArray;

    let newValues: any = {};

    controlArray.controls.forEach((control: AbstractControl) => {
      newValues[control.get("key")?.value] = control.get("value")?.value;
    });

    parentFormGroup.get(formControlName)?.setValue(newValues);
  }

  public getLocaleFor(controlName: string): string {
    return this.formGroupControl.form.get(controlName)?.value;
  }

  public openDisplayNameDescriptionLanguageMap(): void {
    this._localizationService.openDisplayNameDescriptionLanguageMap(this.parentFormGroup, this.updateLocalizationCallback.bind(this));
  }
}