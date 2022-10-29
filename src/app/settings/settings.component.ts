import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EditorSettings } from '../models/EditorSettings';
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
  public form: FormGroup;
  public editorSettings: EditorSettings;

  constructor(settingsService: SettingsService, formBuilder: FormBuilder) {
    this._settingsService = settingsService;
    this._formBuilder = formBuilder;
    this.editorSettings = settingsService.load();

    this.form = this._formBuilder.group({
      context: [this.editorSettings.context],
      baseDtmi: [this.editorSettings.baseDtmi]
    });
  }

  public ngOnInit(): void {  }

  public save() {
    let settings: EditorSettings = this.form.getRawValue()
    this._settingsService.save(settings);    
  }
}
