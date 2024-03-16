import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';
import { InterfaceCapabilityModel } from '../models/InterfaceCapabilityModel';
import { PreviewPanelComponent } from '../preview-panel/preview-panel.component';
import { EditorService } from '../services/editor/editor.service';
import { SettingsService } from '../services/settings/settings.service';
import { ValidationService } from '../services/validation/validation-service.service';
import { SchemaService } from '../services/schema/schema.service';

@Component({
  selector: 'main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss']
})
export class MainEditorComponent implements OnInit {
  public panelOpenState: boolean = false;
  public interfaces: Array<InterfaceCapabilityFormControl>;
  private _editorService: EditorService;  
  private _formBuilder: UntypedFormBuilder;
  private _validationService: ValidationService;
  private _settingsService: SettingsService;
  private _schemaService: SchemaService;
  private _dialog: MatDialog;

  constructor(editorService: EditorService, validationService: ValidationService, settingsService: SettingsService, schemaService: SchemaService, formBuilder: UntypedFormBuilder, dialog: MatDialog) {
    this.interfaces = new Array<InterfaceCapabilityFormControl>();
    this._editorService = editorService;
    this._validationService = validationService;
    this._settingsService = settingsService;
    this._schemaService = schemaService;
    this._formBuilder = formBuilder;    
    this._dialog = dialog;
  }
  
  public ngOnInit(): void {
    this._editorService.interfaces$.subscribe((interfaces: Array<InterfaceCapabilityFormControl>) => {
      this.interfaces = interfaces;
    });
  }

  public addInterface(): void {
    let dtmi = this._settingsService.buildDtmi("myInterface");
    let model = new InterfaceCapabilityModel(dtmi, this._settingsService.editorSettings.context);
    let interfaceInstance = new InterfaceCapabilityFormControl(model, this._validationService, this._schemaService, this._formBuilder, this._dialog);
    this._editorService.addInterface(interfaceInstance);
  }

  public delete($event: Event, formIndex: number): void {
    $event.stopImmediatePropagation();
    this._editorService.deleteInterface(formIndex);
  }

  public openPreviewPanel(): void {
    this._dialog
      .open(PreviewPanelComponent,
        {
          data: this._editorService.interfaces,
          height: "90%",
          width: "80%"
        })
  }
}