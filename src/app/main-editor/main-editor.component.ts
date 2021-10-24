import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service';

@Component({
  selector: 'main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss']
})
export class MainEditorComponent implements OnInit {
  public editorService: EditorService;
  private _formBuilder: FormBuilder;
  public panelOpenState = true;

  constructor(editorService: EditorService, formBuilder: FormBuilder) {
    this.editorService = editorService;
    this._formBuilder = formBuilder;
  }

  public ngOnInit(): void {
    
  }

  public addInterface(): void {
    let interfaceInstance = new InterfaceCapabilityFormControl(this._formBuilder);
    interfaceInstance.model.name = "New Interface";
    this.editorService.addInterface(interfaceInstance);
  }
}