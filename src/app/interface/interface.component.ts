import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor.service'
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';
import { RelationshipCapabilityFormControl } from '../formControls/RelationshipCapabilityFormControl';
import { CommandCapabilityFormControl } from '../formControls/CommandCapabilityFormControl';
import { ComponentCapabilityFormControl } from '../formControls/ComponentCapabilityFormControl';
import { PropertyCapabilityFormControl } from '../formControls/PropertyCapabilityFormControl';
import { TelemetryCapabilityFormControl } from '../formControls/TelemetryCapabilityFormControl';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';

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
    this.interface.subscribeModelToForm(this.interface.form);
  }

  public getContents(): Array<AbstractCapabilityFormControl<AbstractCapabilityModel>> {
    return this.interface.contents;
  }

  public getProperty(capability: AbstractCapabilityFormControl<AbstractCapabilityModel>): PropertyCapabilityFormControl {
    return capability as PropertyCapabilityFormControl;
  }

  public getCommand(capability: AbstractCapabilityFormControl<AbstractCapabilityModel>): CommandCapabilityFormControl {
    return capability as CommandCapabilityFormControl;
  }

  public getTelemetry(capability: AbstractCapabilityFormControl<AbstractCapabilityModel>): TelemetryCapabilityFormControl {
    return capability as TelemetryCapabilityFormControl;
  }

  public getComponent(capability: AbstractCapabilityFormControl<AbstractCapabilityModel>): ComponentCapabilityFormControl {
    return capability as ComponentCapabilityFormControl;
  }

  public getRelationship(capability: AbstractCapabilityFormControl<AbstractCapabilityModel>): RelationshipCapabilityFormControl {
    return capability as RelationshipCapabilityFormControl;
  }
  
  public delete($event: Event, interfaceDefinition: InterfaceCapabilityFormControl): void {
    $event.stopImmediatePropagation();
    this.editorService.deleteCapabilityFromInterface(interfaceDefinition, this.formIndex);
  }

  public getType(capability: AbstractCapabilityFormControl<AbstractCapabilityModel>): string {
    let type = capability.model.type; //capability.form.get("type")?.value;
    let val = type instanceof Array ? type[0] : type;
    return val;
  }
}
