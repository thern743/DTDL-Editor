import { FormBuilder, FormGroup } from "@angular/forms";
import { DisplayNameDescriptionLanguageMap } from "../models/DisplayNameDescriptionLanguageMap";
import { LanguageMap } from "../models/LanguageMap";
import { LocalizationService } from "../services/localization/localization.service";
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractFormControl } from "./AbstractFormControl";

export class LocalizationFormControl extends AbstractFormControl<DisplayNameDescriptionLanguageMap> {
  private _defaultLocale: string;

  constructor(model: DisplayNameDescriptionLanguageMap, localizationService: LocalizationService, validationService: ValidationService, formBuilder: FormBuilder) {
    super(validationService, formBuilder);
    this._defaultLocale = localizationService.defaultLocale;
    this._validationService = validationService;
    this.model = model;
    this.form = this.toFormGroup(model);
  }

  public toFormGroup(model: DisplayNameDescriptionLanguageMap): FormGroup {
    let displayNameArray = this.formBuilder.array([]);

    model.displayNameMap.forEach((languageMap: LanguageMap) => { 
      displayNameArray.push(this.toFormGroupDisplayName(languageMap));
    });

    let descriptionArray = this.formBuilder.array([]);

    model.displayNameMap.forEach((languageMap: LanguageMap) => { 
      descriptionArray.push(this.toFormGroupDescription(languageMap));
    });

    return this.formBuilder.group({
      displayName: displayNameArray,
      description: descriptionArray
    });
  }

  public toFormGroupDisplayName(languageMap: LanguageMap): FormGroup {
    const formGroup = this.formBuilder.group({
      displayName: [languageMap?.value],      
      displayNameLocale: [languageMap?.key ?? this._defaultLocale],
    });
    return formGroup;
  }

  public toFormGroupDescription(languageMap: LanguageMap): FormGroup {
    const formGroup = this.formBuilder.group({
      description: [languageMap?.value],      
      descriptionLocale: [languageMap?.key ?? this._defaultLocale],
    });
    return formGroup;
  }
}