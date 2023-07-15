import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
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

export class InterfaceComponent implements OnInit, OnDestroy, AfterViewInit {
  // Tuple: 
  //    [0] = interface's index within the model, 
  //    [1] = index of the capability within the interface
  @Input() public formIndex!: [number, number];
  @Input() public interface!: InterfaceCapabilityFormControl;
  @Input() public panelOpenState!: boolean;
  @Input() public selectedIndex!: number;
  @Output() public panelToggle: EventEmitter<boolean>;
  
  constructor(public editorService: EditorService) {
    this.panelToggle = new EventEmitter<boolean>();
  }

  public ngOnInit(): void {
    this.interface.subscribeModelToForm(this.interface.form);
  }

  public ngAfterViewInit(): void {
    this.panelToggle.emit(this.panelOpenState);
  }

  public ngOnDestroy(): void {
    this.interface.unsubscribeModelFromForm();
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
  
  public addContext($event: Event, interfaceDefinition: InterfaceCapabilityFormControl): void {
    
  }

  public open(): void {
    this.panelOpenState = true;
    this.panelToggle.emit(this.panelOpenState);
  }

  public close(): void {
    this.panelOpenState = false;
    this.panelToggle.emit(this.panelOpenState);
  }

  public delete($event: Event, interfaceDefinition: InterfaceCapabilityFormControl): void {
    $event.stopImmediatePropagation();
    this.editorService.deleteCapabilityFromInterface(interfaceDefinition, this.formIndex);
  }

  public getType(capability: AbstractCapabilityFormControl<AbstractCapabilityModel>): string {
    let type = capability.model["@type"];
    let val = type instanceof Array ? type[0] : type;
    return val;
  }

  public parseNameFromDtmi(dtmi: string): string {
    const result = this.editorService.parseNameFromDtmi(dtmi);
    return result;
  }
}
