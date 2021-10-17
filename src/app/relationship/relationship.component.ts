import { Component, Input, OnInit } from '@angular/core';
import { ICapabilityFormControl } from '../models/ICapabilityFormControl';
import { PropertyCapabilityFormControl } from '../models/PropertyCapabilityFormControl';
import { RelationshipCapabilityFormControl } from '../models/RelationshipCapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service';

@Component({
  selector: 'relationship-definition',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.scss']
})
export class RelationshipComponent implements OnInit {
  @Input() formIndex: number = 0;
  @Input() relationship!: RelationshipCapabilityFormControl;
  panelOpenState = false;

  constructor(public editorService: EditorService) { 
    
  }

  ngOnInit(): void { 
    
  }

  getProperty(capability: ICapabilityFormControl): PropertyCapabilityFormControl {
    return capability as PropertyCapabilityFormControl;
  }
}
