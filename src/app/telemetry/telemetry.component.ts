import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TelemetryCapability } from '../models/TelemetryCapability';
import { EditorService } from '../services/editor/editor-service.service';

@Component({
  selector: 'telemetry-definition',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.scss']
})
export class TelemetryComponent implements OnInit {
  @Input() formIndex: number = 0;
  @Input() telemetry!: TelemetryCapability;
  panelOpenState = false;
  
  constructor(public editorService: EditorService, private fb: FormBuilder) { 
    
  }

  ngOnInit(): void {  
    
  }
}