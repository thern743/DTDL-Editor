import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor-service.service'
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';
import { ICapabilityFormControl } from '../formControls/ICapabilityFormControl';
import { RelationshipCapabilityFormControl } from '../formControls/RelationshipCapabilityFormControl';
import { ICapabilityModel } from '../models/ICapabilityModel';

@Component({
  selector: 'interface-definition',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})

export class InterfaceComponent implements OnInit {
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

  public getRelationship(capability: ICapabilityFormControl<ICapabilityModel>): RelationshipCapabilityFormControl {
    return capability as RelationshipCapabilityFormControl;
  }

  public delete($event: Event): void {
    $event.stopImmediatePropagation();
    this.editorService.deleteCapabilityFromInterface(this.formIndex);
  }
}
