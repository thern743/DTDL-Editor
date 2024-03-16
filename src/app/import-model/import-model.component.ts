import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';
import { InterfaceCapabilityModel } from '../models/InterfaceCapabilityModel';
import { EditorService } from '../services/editor/editor.service';
import { ValidationService } from '../services/validation/validation-service.service';
import { SchemaService } from '../services/schema/schema.service';

@Component({
  selector: 'import-model',
  templateUrl: './import-model.component.html',
  styleUrls: ['./import-model.component.scss']
})
export class ImportModelComponent implements OnInit {
  private _editorService: EditorService;

  constructor(editorService: EditorService) { 
    this._editorService = editorService;
  }

  public ngOnInit(): void {
  }

  public fileSelected($event: InterfaceCapabilityModel): void {
  }
}
