import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor-service.service'
import { InterfaceCapability } from '../models/InterfaceCapability';
import { ICapability } from '../models/ICapability';
import { PropertyCapability } from '../models/PropertyCapability';
import { CommandCapability } from '../models/CommandCapability';
import { TelemetryCapability } from '../models/TelemetryCapability';

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
  panelOpenState = true;
  
  constructor(public editorService: EditorService) {
   
  }

  ngOnInit(): void {
    this.interface?.toFormGroup();
  }

  getProperty(capability: ICapability): PropertyCapability {
    return capability as PropertyCapability;
  }

  getCommand(capability: ICapability): CommandCapability {
    return capability as CommandCapability;
  }

  getTelemetry(capability: ICapability): TelemetryCapability {
    return capability as TelemetryCapability;
  }
}
