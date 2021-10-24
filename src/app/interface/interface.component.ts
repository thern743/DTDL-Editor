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
  // TODO: Support multiple interfaces from main editor.
  public formIndex: number = 0;
  @Input() public interface!: InterfaceCapabilityFormControl;
  public panelOpenState = true;
  
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
}
