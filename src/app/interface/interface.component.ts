import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor-service.service'
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';
import { ICapabilityFormControl } from '../formControls/ICapabilityFormControl';
import { RelationshipCapabilityFormControl } from '../formControls/RelationshipCapabilityFormControl';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { SemanticTypeArray } from '../models/SemanticTypeArray';
import { CommandCapabilityFormControl } from '../formControls/CommandCapabilityFormControl';
import { ComponentCapabilityFormControl } from '../formControls/ComponentCapabilityFormControl';
import { PropertyCapabilityFormControl } from '../formControls/PropertyCapabilityFormControl';
import { TelemetryCapabilityFormControl } from '../formControls/TelemetryCapabilityFormControl';

@Component({
  selector: 'interface-definition',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})

export class InterfaceComponent implements OnInit {
  // Tuple: 
  //    [0] = interface's index within the model, 
  //    [1] = index of the capability within the interface
  @Input() public formIndex!: [number, number];
  @Input() public interface!: InterfaceCapabilityFormControl;
  @Input() public panelOpenState!: boolean;
  @Input() public selectedIndex!: number;
  
  constructor(public editorService: EditorService) {
   
  }

  public ngOnInit(): void {
    this.interface.subscribeModelToForm();
  }

  public getContents(): Array<ICapabilityFormControl<ICapabilityModel>> {
    return this.interface.contents;
  }

  public getProperty(capability: ICapabilityFormControl<ICapabilityModel>): PropertyCapabilityFormControl {
    return capability as PropertyCapabilityFormControl;
  }

  public getCommand(capability: ICapabilityFormControl<ICapabilityModel>): CommandCapabilityFormControl {
    return capability as CommandCapabilityFormControl;
  }

  public getTelemetry(capability: ICapabilityFormControl<ICapabilityModel>): TelemetryCapabilityFormControl {
    return capability as TelemetryCapabilityFormControl;
  }

  public getComponent(capability: ICapabilityFormControl<ICapabilityModel>): ComponentCapabilityFormControl {
    return capability as ComponentCapabilityFormControl;
  }

  public getRelationship(capability: ICapabilityFormControl<ICapabilityModel>): RelationshipCapabilityFormControl {
    return capability as RelationshipCapabilityFormControl;
  }
  
  public delete($event: Event, interfaceDefinition: InterfaceCapabilityFormControl): void {
    $event.stopImmediatePropagation();
    this.editorService.deleteCapabilityFromInterface(interfaceDefinition, this.formIndex);
  }

  public getType(capability: ICapabilityFormControl<ICapabilityModel>): string {
    let type = capability.form.get("type")?.value;
    let val = type instanceof SemanticTypeArray ? type[0] : type;
    return val;
  }
}
