import { Component, EventEmitter, Inject, Input, Output, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageMap } from '../models/LanguageMap';
import { LocalizationService } from '../services/localization/localization.service';

@Component({
  selector: 'language-map',
  templateUrl: './language-map.component.html',
  styleUrls: ['./language-map.component.scss']
})
export class LanguageMapComponent implements OnInit {
  @Input() public id!: string;
  @Input() public labelText!: string;
  @Input() public control!: FormControl;
  @Input() public languageMapFormArray!: FormArray;
  @Input() public style: string = "width: 200px";
  @Inject(MAT_DIALOG_DATA) public data?: boolean = false;
  private _localizationService: LocalizationService;
  private _formBuilder: FormBuilder

  constructor(localizationService: LocalizationService, formBuilder: FormBuilder) { 
    this._localizationService = localizationService;
    this._formBuilder = formBuilder;
  }

  public ngOnInit(): void {
    const languageMap = new LanguageMap();
    languageMap.key = "en-US";
    languageMap.value = "";

    const languageMapArray = new Array<LanguageMap>(languageMap);
    this.languageMapFormArray = this.toFormArray(languageMapArray);
  }

  private toFormArray(values: Array<LanguageMap>): FormArray {
    const formArray = this._formBuilder.array([]);

    values.forEach((languageMap: LanguageMap) => { 
      formArray.push(this.toFormGroup(languageMap));
    });

    return formArray;
  }

  private toFormGroup(languageMap: LanguageMap): FormGroup {
    const formGroup = this._formBuilder.group({
      key: [languageMap.key],
      value: [languageMap.value],
    });

    return formGroup;
  }

  public getFormGroup(group: AbstractControl): FormGroup {
    return group as FormGroup;
  }

  public getLocales(): Array<string> {
    return this._localizationService.getLocales();
  }

  public addLocale(): void {
    const languageMap = new LanguageMap();
    languageMap.key = "en-US";
    languageMap.value = "";

    const formGroup = this.toFormGroup(languageMap);
    this.languageMapFormArray.push(formGroup);
  }

  public removeLocale(index: number): void {
    this.languageMapFormArray.removeAt(index);    
  }

  public getData(): FormArray {
    return this.languageMapFormArray;
  }
}
