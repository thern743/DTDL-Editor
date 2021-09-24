import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DtdlModelForm } from '../models/DtdlModelForm';
import { EditorService } from '../services/editor/editor-service.service';

@Component({
  selector: 'telemetry-definition',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.scss']
})
export class TelemetryComponent implements OnInit {
  editorService: EditorService;
  panelOpenState = false;
  telemetryForm: FormGroup;

  constructor(editorService: EditorService, dtdlModelForm: DtdlModelForm) { 
    this.editorService = editorService;
    this.telemetryForm = dtdlModelForm.telemetryForm;
  }

  ngOnInit(): void {
  }

}
