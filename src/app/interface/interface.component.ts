import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor-service.service'
import { InterfaceCapabilityFormControl } from '../models/InterfaceCapabilityFormControl';
import { ICapabilityFormControl } from '../models/ICapabilityFormControl';
import { RelationshipCapabilityFormControl } from '../models/RelationshipCapabilityFormControl';
import { ICapabilityDto } from '../models/ICapabilityDto';

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

  public ngOnInit(): void {
    this.interface?.toFormGroup();
  }

  public getContents(): Array<ICapabilityFormControl<ICapabilityDto>> {
    return this.interface.contents;
  }

  public getRelationship(capability: ICapabilityFormControl<ICapabilityDto>): RelationshipCapabilityFormControl {
    return capability as RelationshipCapabilityFormControl;
  }
}
