import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
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
  public displayNameFormArray!: UntypedFormArray;
  public descriptionFormArray!: UntypedFormArray;
  @Input() public parentFormGroup!: UntypedFormGroup;
  @Input() public formIndex: number = -1;
  private _localizationService: LocalizationService;
  private _formBuilder: UntypedFormBuilder;

  constructor(localizationService: LocalizationService, formBuilder: UntypedFormBuilder) {
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

  public displayNameToFormGroup(): UntypedFormGroup {
    const formGroup = this._formBuilder.group({
      displayName: this.displayNameComponent?.getData(),
    });

    return formGroup;
  }

  public descriptionToFormGroup(): UntypedFormGroup {
    const formGroup = this._formBuilder.group({
      description: this.descriptionComponent?.getData()
    });

    return formGroup;
  }

  protected updateLocalizationCallback(parentFormGroup: UntypedFormGroup, formGroup: UntypedFormGroup): void {
    if(!parentFormGroup || !formGroup) return;

    let controlName = "displayName";
    this.displayNameFormArray = formGroup.get(controlName) as UntypedFormArray;
    this.updateLocalizationInternal(parentFormGroup, formGroup, controlName);

    controlName = "description";
    this.descriptionFormArray = formGroup.get(controlName) as UntypedFormArray;
    this.updateLocalizationInternal(parentFormGroup, formGroup, controlName);
  }

  private updateLocalizationInternal(parentFormGroup: UntypedFormGroup, formGroup: UntypedFormGroup, controlName: string): void {
    const newValues = this.updateLocalizationValues(formGroup, controlName);
    parentFormGroup.get(controlName)?.setValue(newValues);
  }

  public updateLocalizationValues(formGroup: UntypedFormGroup, controlName: string): any {
    const controlArray = formGroup.get(controlName) as UntypedFormArray;

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