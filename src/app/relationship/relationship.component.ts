import { Component, Input, OnInit } from '@angular/core';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { ICapabilityFormControl } from '../formControls/ICapabilityFormControl';
import { RelationshipCapabilityFormControl } from '../formControls/RelationshipCapabilityFormControl';
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
    this.relationship.subscribe();
  }

  public getProperties(): Array<ICapabilityFormControl<ICapabilityModel>> {
    return (<RelationshipCapabilityFormControl>this.relationship).properties;
  }
}
