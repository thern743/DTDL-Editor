import { Component, Input, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DtdlModelForm } from '../models/DtdlModelForm';
import { EditorService } from '../services/editor/editor-service.service';

@Component({
  selector: 'telemetry-definition',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.scss']
})
export class TelemetryComponent implements OnInit {
  @Input() formIndex: number = 0;
  telemetryForm: FormGroup = this.fb.group({});
  panelOpenState = false;
    
  constructor(public editorService: EditorService, private fb: FormBuilder) { 
    
  }

  ngOnInit(): void {
  }

}
