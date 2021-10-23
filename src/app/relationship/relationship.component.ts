import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ICapabilityDto } from '../models/ICapabilityDto';
import { ICapabilityFormControl } from '../models/ICapabilityFormControl';
import { IDtdlComponent } from '../models/IDtdlComponent';
import { PropertyCapabilityFormControl } from '../models/PropertyCapabilityFormControl';
import { RelationshipCapabilityFormControl } from '../models/RelationshipCapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service';

@Component({
  selector: 'relationship-definition',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.scss']
})
export class RelationshipComponent implements IDtdlComponent, OnInit {
  @Input() formIndex: number = 0;
  @Input() relationship!: ICapabilityFormControl<ICapabilityDto>;//RelationshipCapabilityFormControl;
  panelOpenState = false;

  constructor(public editorService: EditorService) { 
    
  }
 
  ngOnInit(): void { 
    
  }

  public getProperties(): Array<ICapabilityFormControl<ICapabilityDto>> {
    return (<RelationshipCapabilityFormControl>this.relationship).properties;
  }

  public getProperty(capability: PropertyCapabilityFormControl): PropertyCapabilityFormControl {
    return capability as PropertyCapabilityFormControl;
  }
}
