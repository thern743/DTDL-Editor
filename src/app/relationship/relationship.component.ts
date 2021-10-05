import { Component, Input, OnInit } from '@angular/core';
import { ICapability } from '../models/ICapability';
import { PropertyCapability } from '../models/PropertyCapability';
import { RelationshipCapability } from '../models/RelationshipCapability';
import { EditorService } from '../services/editor/editor-service.service';

@Component({
  selector: 'relationship-definition',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.scss']
})
export class RelationshipComponent implements OnInit {
  @Input() formIndex: number = 0;
  @Input() relationship!: RelationshipCapability;
  panelOpenState = false;

  constructor(public editorService: EditorService) { 
    
  }

  ngOnInit(): void { 
    
  }

  getProperty(capability: ICapability): PropertyCapability {
    return capability as PropertyCapability;
  }
}
