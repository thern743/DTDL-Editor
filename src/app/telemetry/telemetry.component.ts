import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { ICapabilityFormControl } from '../formControls/ICapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service';

@Component({
  selector: 'telemetry-definition',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.scss']
})
export class TelemetryComponent implements OnInit {
  @Input() public formIndex: number = 0;
  @Input() public telemetry!: ICapabilityFormControl<ICapabilityModel>;
  @Input() public panelOpenState!: boolean;
  
  constructor(public editorService: EditorService, private fb: FormBuilder) { 
    
  }

  public ngOnInit(): void {  
    this.telemetry.subscribeModelToForm();
  }
}