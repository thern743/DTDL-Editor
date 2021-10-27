import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';
import { InterfaceCapabilityModel } from '../models/InterfaceCapabilityModel';
import { EditorService } from '../services/editor/editor-service.service';

@Component({
  selector: 'main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss']
})
export class MainEditorComponent implements OnInit {
  public editorService: EditorService;
  private _formBuilder: FormBuilder;

  constructor(editorService: EditorService, formBuilder: FormBuilder) {
    this.editorService = editorService;
    this._formBuilder = formBuilder;

    let model = new InterfaceCapabilityModel("Default Interface");
    let interfaceInstance = new InterfaceCapabilityFormControl(model, this._formBuilder);
    this.editorService.addInterface(interfaceInstance);
  }

  public ngOnInit(): void {
    
  }

  public addInterface(): void {
    let model = new InterfaceCapabilityModel("New Interface");
    let interfaceInstance = new InterfaceCapabilityFormControl(model, this._formBuilder);
    this.editorService.addInterface(interfaceInstance);
  }
}