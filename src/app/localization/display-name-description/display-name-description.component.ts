import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup } from "@angular/forms";
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
  @Input() public formIndex: number = -1;
  private _localizationService: LocalizationService;
  private _formBuilder: FormBuilder;

  constructor(localizationService: LocalizationService, formBuilder: FormBuilder) {
    this._localizationService = localizationService;
    this._formBuilder = formBuilder;
  }

  public ngOnInit(): void {
  }

  public displayNameTextChange($event: any): void {
    let result = this.displayNameToFormGroup();
    this.updateLocalizationInternal(this.parentFormGroup, result, "displayName");
  }

  public descriptionTextChange($event: any): void {
    let result = this.descriptionToFormGroup();
    this.updateLocalizationInternal(this.parentFormGroup, result, "description");
  }

  public displayNameToFormGroup(): FormGroup {
    const formGroup = this._formBuilder.group({
      displayName: this.displayNameComponent?.getData(),
    });

    return formGroup;
  }

  public descriptionToFormGroup(): FormGroup {
    const formGroup = this._formBuilder.group({
      description: this.descriptionComponent?.getData()
    });

    return formGroup;
  }

  protected updateLocalizationCallback(parentFormGroup: FormGroup, formGroup: FormGroup): void {
    if(!parentFormGroup || !formGroup) return;

    let controlName = "displayName";
    this.displayNameFormArray = formGroup.get(controlName) as FormArray;
    this.updateLocalizationInternal(parentFormGroup, formGroup, controlName);

    controlName = "description";
    this.descriptionFormArray = formGroup.get(controlName) as FormArray;
    this.updateLocalizationInternal(parentFormGroup, formGroup, controlName);
  }

  private updateLocalizationInternal(parentFormGroup: FormGroup, formGroup: FormGroup, controlName: string): void {
    const newValues = this.updateLocalizationValues(formGroup, controlName);
    parentFormGroup.get(controlName)?.setValue(newValues);
  }

  public updateLocalizationValues(formGroup: FormGroup, controlName: string): any {
    const controlArray = formGroup.get(controlName) as FormArray;

    let newValues: any = {};

    controlArray.controls.forEach((control: AbstractControl) => {
      newValues[control.get("key")?.value] = control.get("value")?.value;
    });

    return newValues;
  }

  public openDisplayNameDescriptionLanguageMap(): void {
    this._localizationService.openDisplayNameDescriptionLanguageMap(this.parentFormGroup, this.updateLocalizationCallback.bind(this));
  }
}