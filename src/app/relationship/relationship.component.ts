import { Component, Input, OnInit } from '@angular/core';
import { ICapabilityDto } from '../models/ICapabilityDto';
import { ICapabilityFormControl } from '../models/ICapabilityFormControl';
import { RelationshipCapabilityFormControl } from '../models/RelationshipCapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service';

@Component({
  selector: 'relationship-definition',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.scss']
})
export class RelationshipComponent implements OnInit {
  @Input() public formIndex: number = 0;
  @Input() public relationship!: RelationshipCapabilityFormControl;
  panelOpenState = false;

  constructor(public editorService: EditorService) { 
    
  }
 
  public ngOnInit(): void { 
    
  }

  public getProperties(): Array<ICapabilityFormControl<ICapabilityDto>> {
    return (<RelationshipCapabilityFormControl>this.relationship).properties;
  }
}
