import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EditorSettings } from '../models/EditorSettings';
import { SettingsService } from '../services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public baseDtmi: FormControl;
  private _settingsService: SettingsService;
  private _editorSettings: EditorSettings;

  constructor(settingsService: SettingsService) {
    this._settingsService = settingsService;     
    this.baseDtmi = new FormControl();
    this._editorSettings = settingsService.load();
  }

  public ngOnInit(): void {
    if(["", null, undefined].indexOf(this._editorSettings.BaseDtmi) > -1) {
      this.baseDtmi.setValue(SettingsService.DEFAULT_DTMI);
    } else {
      this.baseDtmi.setValue(this._editorSettings.BaseDtmi);
    }
  }

  public save() {
    this._settingsService.save(this.baseDtmi.value);    
  }
}
