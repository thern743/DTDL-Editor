import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { LocalizationFormControl } from "src/app/formControls/LocalizationFormControl";
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
    
    let controlName = "displayName";
    this.displayNameFormArray = result.get(controlName) as FormArray;
    const displayNameValues = this.displayNameComponent.updateLocalization(result, controlName);
    parentFormGroup.get(controlName)?.setValue(displayNameValues);

    controlName = "description";
    this.descriptionFormArray = result.get(controlName) as FormArray;
    const descriptionValues = this.descriptionComponent.updateLocalization(result, controlName);
    parentFormGroup.get(controlName)?.setValue(descriptionValues);
  }

  public getLocaleFor(controlName: string): string {
    return this.formGroupControl.form.get(controlName)?.value;
  }

  public openDisplayNameDescriptionLanguageMap(): void {
    this._localizationService.openDisplayNameDescriptionLanguageMap(this.parentFormGroup, this.updateLocalizationCallback.bind(this));
  }
}