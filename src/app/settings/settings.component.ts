import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EditorSettings, EditorSettingsDto } from '../models/EditorSettings';
import { SettingsService } from '../services/settings/settings.service';

// TODO: Add option to disable filling in default DTMIs/IDs
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private _settingsService: SettingsService;
  private _formBuilder: FormBuilder;
  public form!: FormGroup;

  constructor(settingsService: SettingsService, formBuilder: FormBuilder) {
    this._settingsService = settingsService;
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
      baseDtmi: [this._settingsService.editorSettings.baseDtmi]
    });
  }

  public save() {
    let settings: EditorSettingsDto = this.form.getRawValue();
    this._settingsService.save(settings); 
    this._settingsService.load();
    this.toFormGroup();   
  }
}
