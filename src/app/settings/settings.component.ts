import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SettingsService } from '../services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public baseDtmi: FormControl;
  private _settingsService: SettingsService;

  constructor(settingsService: SettingsService) { 
    this._settingsService = settingsService;
    this.baseDtmi = new FormControl();
  }

  public ngOnInit(): void {
    let settings = this._settingsService.load();

    if(["", null, undefined].indexOf(settings) > -1) {
      this.baseDtmi.setValue("dtmi:com:dtdlEditor:default;1");
    } else {
      this.baseDtmi.setValue(settings);
    }
  }

  public save() {
    this._settingsService.save(this.baseDtmi.value);
    
  }
}
