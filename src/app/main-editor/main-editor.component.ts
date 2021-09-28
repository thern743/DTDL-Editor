import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EditorService } from '../services/editor/editor-service.service'
import { DtdlModelForm } from "../models/DtdlModelForm";
import { TelemetryCapability } from "../models/TelemetryCapability";
import { CommandCapability } from "../models/CommandCapability";
import { PropertyCapability } from "../models/PropertyCapability";

@Component({
  selector: 'main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss']
})

export class MainEditorComponent implements OnInit {
  mainForm: FormGroup = this.fb.group({});
  panelOpenState = true;
  capabilityType: FormControl;
  
    constructor(public editorService: EditorService, private fb: FormBuilder) {
    this.mainForm.patchValue({ context: "dtmi:dtdl:context;2" });
    this.capabilityType = new FormControl();
  }

  ngOnInit(): void {
    
  }

  get capabilities(): FormArray {
    return this.mainForm.get("contents") as FormArray;
  }

  addCapability(index: number): void {
    console.log("Adding " + this.capabilityType.value + "...");

    let capability: FormGroup;
    
    switch(this.capabilityType.value) {
      case 'Property':        
        capability = new PropertyCapability(this.fb).newFormItem("newProperty" + index, "newProperty" + index);
        break;
      case 'Command':
        capability = new CommandCapability(this.fb).newFormItem("newCommand" + index, "newCommand" + index);
        break;
      case 'Telemetry':
        capability = new TelemetryCapability(this.fb).newFormItem("newTelemetry" + index, "newTelemetry" + index);
        break;
      default:
        capability = this.fb.group({});
        break;
    }

    let contents = this.mainForm.get("contents") as FormArray;
    contents.push(capability);
  }
}
