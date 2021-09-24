import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EditorService } from '../services/editor/editor-service.service'
import { DtdlModelForm } from "../models/DtdlModelForm";

@Component({
  selector: 'main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss']
})

export class MainEditorComponent implements OnInit {
  panelOpenState = true;
  editorService: EditorService;
  mainForm: FormGroup;
  capabilityType: FormControl;

  constructor(editorService: EditorService, dtdlModelForm: DtdlModelForm) {
    this.editorService = editorService;
    this.mainForm = dtdlModelForm.mainForm;
    this.mainForm.patchValue({ context: "dtmi:dtdl:context;2" });
    this.capabilityType = new FormControl();
  }

  ngOnInit(): void {

  }

  action(): void {
    
  }
}
