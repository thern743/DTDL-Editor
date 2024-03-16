import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { LocalizationService } from '../services/localization/localization.service';
import { SettingsService } from '../services/settings/settings.service';
import { EditorSettings } from '../models/EditorSettings';

// TODO: Add option to disable automatically filling in default DTMI from SettingsService
//       Some users may prefer to manually type in the DTMI for each component and so we should
//       expose an option to let them do so.
@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private _settingsService: SettingsService;
  private _localizationService: LocalizationService;
  private _formBuilder: UntypedFormBuilder;
  public form!: UntypedFormGroup;

  constructor(settingsService: SettingsService, localizationService: LocalizationService, formBuilder: UntypedFormBuilder) {
    this._settingsService = settingsService;
    this._localizationService = localizationService;
    this._formBuilder = formBuilder;
  }

  public ngOnInit(): void {  
    this.toFormGroup();
  }

  private toFormGroup(): void {
    this.form = this._formBuilder.group({
      context: [this._settingsService.editorSettings.context],
      scheme: [this._settingsService.editorSettings.scheme],
      fullPath: [this._settingsService.editorSettings.fullPath],
      version: [this._settingsService.editorSettings.version],
      baseDtmi: [this._settingsService.editorSettings.baseDtmi],
      locale: [this._settingsService.editorSettings.locale],
      dtdlVersion: [this._settingsService.editorSettings.dtdlVersion]
    });
  }

  public getLocales(): Array<string> {
    return this._localizationService.getLocales();
  }

  public changeDtdlVersion($event: MatSelectChange): void {
    const tokens = (this.form.get("context")?.value as string)?.split(';')
    if (tokens.length > 1)
      this.form.get("context")?.setValue(`${tokens[0]};${$event.value}`)
  }

  public save() {
    let settings: EditorSettings = this.form.getRawValue();
    this._settingsService.save(settings); 
    this.toFormGroup();   
  }
}
