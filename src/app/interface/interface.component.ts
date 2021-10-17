import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor-service.service'
import { InterfaceCapabilityFormControl } from '../models/InterfaceCapabilityFormControl';
import { ICapabilityFormControl } from '../models/ICapabilityFormControl';
import { PropertyCapabilityFormControl } from '../models/PropertyCapabilityFormControl';
import { CommandCapabilityFormControl } from '../models/CommandCapabilityFormControl';
import { TelemetryCapabilityFormControl } from '../models/TelemetryCapabilityFormControl';
import { ComponentCapabilityFormControl } from '../models/ComponentCapabilityFormControl';
import { RelationshipCapabilityFormControl } from '../models/RelationshipCapabilityFormControl';

@Component({
  selector: 'interface-definition',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})

export class InterfaceComponent implements OnInit {
  // TODO: Support multiple interfaces from main editor.
  //@Input() formIndex: number = 0;
  formIndex: number = 0;
  @Input() interface!: InterfaceCapabilityFormControl;
  panelOpenState = true;
  
  constructor(public editorService: EditorService) {
   
  }

  ngOnInit(): void {
    this.interface?.toFormGroup();
  }

  getProperty(capability: PropertyCapabilityFormControl): PropertyCapabilityFormControl {
    return capability as PropertyCapabilityFormControl;
  }

  getCommand(capability: CommandCapabilityFormControl): CommandCapabilityFormControl {
    return capability as CommandCapabilityFormControl;
  }

  getTelemetry(capability: TelemetryCapabilityFormControl): TelemetryCapabilityFormControl {
    return capability as TelemetryCapabilityFormControl;
  }

  getComponent(capability: ComponentCapabilityFormControl): ComponentCapabilityFormControl {
    return capability as ComponentCapabilityFormControl;
  }

  getRelationship(capability: RelationshipCapabilityFormControl): RelationshipCapabilityFormControl {
    return capability as RelationshipCapabilityFormControl;
  }
}
