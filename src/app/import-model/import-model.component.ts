import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';
import { InterfaceCapabilityModel } from '../models/InterfaceCapabilityModel';
import { EditorService } from '../services/editor/editor-service.service';
import { ValidationService } from '../services/validation/validation-service.service';

@Component({
  selector: 'import-model',
  templateUrl: './import-model.component.html',
  styleUrls: ['./import-model.component.scss']
})
export class ImportModelComponent implements OnInit {
  private _editorService: EditorService;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService

  constructor(editorService: EditorService, validationService: ValidationService, formBuilder: FormBuilder) { 
    this._editorService = editorService;
    this._validationService = validationService;
    this._formBuilder = formBuilder;
  }

  public ngOnInit(): void {
  }

  public addInterface($event: InterfaceCapabilityModel): void {
    var formControl = new InterfaceCapabilityFormControl($event, this._formBuilder, this._validationService);
    this._editorService.addInterface(formControl);
  }
}
