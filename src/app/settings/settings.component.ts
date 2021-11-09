import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public dialogRef: MatDialogRef<SettingsComponent>;
  public baseDtmi: FormControl;

  constructor(dialogRef: MatDialogRef<SettingsComponent>) { 
    this.dialogRef = dialogRef;
    this.baseDtmi = new FormControl("dtmi:com:example;1");
  }

  ngOnInit(): void {
  }
}
