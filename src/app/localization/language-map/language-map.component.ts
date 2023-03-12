import { Component, EventEmitter, Inject, Input, Output, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormBuilder, FormControl, UntypedFormGroup } from '@angular/forms';
import { LanguageMap } from 'src/app/models/LanguageMap';
import { LocalizationService } from 'src/app/services/localization/localization.service';

@Component({
  selector: 'language-map',
  templateUrl: './language-map.component.html',
  styleUrls: ['./language-map.component.scss']
})
export class LanguageMapComponent implements OnInit {
  @Input() public localize: boolean = true;
  @Input() public id!: string;
  @Input() public labelText!: string;
  @Input() public languageMapFormArray!: UntypedFormArray;
  @Input() public style: string = "width: 200px";
  @Output() public change = new EventEmitter<any>();
  private _localizationService: LocalizationService;
  private _formBuilder: UntypedFormBuilder

  constructor(localizationService: LocalizationService, formBuilder: UntypedFormBuilder) { 
    this._localizationService = localizationService;
    this._formBuilder = formBuilder;
  }

  public ngOnInit(): void {
    const languageMap = new LanguageMap();
    languageMap.key = this._localizationService.defaultLocale;
    languageMap.value = "";

    const languageMapArray = new Array<LanguageMap>(languageMap);
    this.languageMapFormArray = this.toFormArray(languageMapArray);
  }

  public textChange($event: any): void {
    this.change.emit($event);
  }

  private toFormArray(values: Array<LanguageMap>): UntypedFormArray {
    const formArray = this._formBuilder.array([]);

    values.forEach((languageMap: LanguageMap) => { 
      formArray.push(this.toFormGroup(languageMap));
    });

    return formArray;
  }

  private toFormGroup(languageMap: LanguageMap): UntypedFormGroup {
    const formGroup = this._formBuilder.group({
      key: [languageMap.key],
      value: [languageMap.value],
    });

    return formGroup;
  }

  public getFormGroup(group: AbstractControl): UntypedFormGroup {
    return group as UntypedFormGroup;
  }

  public getLocales(): Array<string> {
    return this._localizationService.getLocales();
  }

  public addLocale(): void {
    const languageMap = new LanguageMap();
    languageMap.key = this._localizationService.defaultLocale;
    languageMap.value = "";

    const formGroup = this.toFormGroup(languageMap);
    this.languageMapFormArray.push(formGroup);
  }

  public removeLocale(index: number): void {
    this.languageMapFormArray.removeAt(index);    
  }

  public getData(): UntypedFormArray {
    return this.languageMapFormArray;
  }

  public getLocaleFor(index: number): string {
    return this.languageMapFormArray.at(index).get("key")?.value;
  }
}
