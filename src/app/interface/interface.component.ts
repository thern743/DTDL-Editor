import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EditorService } from '../services/editor/editor-service.service'
import { TelemetryCapability } from "../models/TelemetryCapability";
import { CommandCapability } from "../models/CommandCapability";
import { PropertyCapability } from "../models/PropertyCapability";
import { InterfaceCapability } from '../models/InterfaceCapability';

@Component({
  selector: 'interface-definition',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})

export class InterfaceComponent implements OnInit {
  // TODO: Support multiple interfaces from main editor.
  //@Input() formIndex: number = 0;
  formIndex: number = 0;
  @Input() interface!: InterfaceCapability;
  interfaceForm!: FormGroup;
  panelOpenState = true;
  capabilityType: FormControl;
  
  constructor(public editorService: EditorService, private fb: FormBuilder) {
    this.capabilityType = new FormControl();    
  }

  ngOnInit(): void {
    this.interfaceForm = this.interface?.toFormGroup();
  }

  addCapability(): void {
    console.log("Adding " + this.capabilityType.value + "...");

    let capability: FormGroup;
    
    switch(this.capabilityType.value) {
      case 'Property':        
        capability = new PropertyCapability(this.fb).toFormGroup();
        break;
      case 'Command':
        capability = new CommandCapability(this.fb).toFormGroup();
        break;
      case 'Telemetry':
        capability = new TelemetryCapability(this.fb).toFormGroup();
        break;
      default:
        capability = this.fb.group({});
        break;
    }

    let contents = this.interfaceForm.get("contents") as FormArray;
    contents.push(capability);
  }
}
