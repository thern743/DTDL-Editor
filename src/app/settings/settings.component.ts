import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public baseDtmi: FormControl;

  constructor() { 
    this.baseDtmi = new FormControl("dtmi:com:example;1");
  }

  ngOnInit(): void {
    
  }
}
