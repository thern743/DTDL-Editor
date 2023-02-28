import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';
import { InterfaceCapabilityModel } from '../models/InterfaceCapabilityModel';
import { EditorService } from '../services/editor/editor.service';
import { SettingsService } from '../services/settings/settings.service';
import { ValidationService } from '../services/validation/validation-service.service';

@Component({
  selector: 'main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss']
})
export class MainEditorComponent implements OnInit {
  public editorService: EditorService;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;
  private _settingsService: SettingsService;
  private _dialog: MatDialog;

  constructor(editorService: EditorService, formBuilder: FormBuilder, validationService: ValidationService, settingsService: SettingsService, dialog: MatDialog) {
    this.editorService = editorService;
    this._validationService = validationService;
    this._formBuilder = formBuilder;    
    this._settingsService = settingsService;
    this._dialog = dialog;
  }

  public ngOnInit(): void {
  }

  public addInterface(): void {
    let dtmi = this._settingsService.buildDtmi("myInterface");
    let model = new InterfaceCapabilityModel(dtmi, this._settingsService.editorSettings.context);
    let interfaceInstance = new InterfaceCapabilityFormControl(model, this._formBuilder, this._validationService, this._dialog);
    this.editorService.addInterface(interfaceInstance);
  }
}