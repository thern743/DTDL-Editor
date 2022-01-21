import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';
import { InterfaceCapabilityModel } from '../models/InterfaceCapabilityModel';
import { EditorService } from '../services/editor/editor-service.service';
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

  constructor(editorService: EditorService, formBuilder: FormBuilder, validationService: ValidationService, settingsService: SettingsService) {
    this.editorService = editorService;
    this._validationService = validationService;
    this._formBuilder = formBuilder;    
    this._settingsService = settingsService;
  }

  public ngOnInit(): void {
  }

  public addInterface(): void {
    let settings = this._settingsService.load();
    let model = new InterfaceCapabilityModel(settings.baseDtmi, settings.context);
    let interfaceInstance = new InterfaceCapabilityFormControl(model, this._formBuilder, this._validationService);
    this.editorService.addInterface(interfaceInstance);
  }
}