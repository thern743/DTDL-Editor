import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EditorService } from '../services/editor/editor-service.service'
import { DtdlModelForm } from "../models/DtdlModelForm";

@Component({
  selector: 'main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.less']
})

export class MainEditorComponent implements OnInit {
  panelOpenState = true;
  editorService: EditorService;
  dtdlModelMainForm: FormGroup;

  capabilityType = new FormControl('');
  semanticType = new FormControl('');
  schema = new FormControl('');
  extends = new FormControl('');
  writable = new FormControl('');
  commandType = new FormControl('');

  constructor(editorService: EditorService, dtdlModelForm: DtdlModelForm) {
    this.editorService = editorService;
    this.dtdlModelMainForm = dtdlModelForm.mainForm;
    this.dtdlModelMainForm.patchValue({ context: "dtmi:dtdl:context;2" });
  }

  ngOnInit(): void {

  }

  action(): void {
    
  }
}
