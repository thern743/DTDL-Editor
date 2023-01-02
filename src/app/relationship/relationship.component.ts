import { Component, Input, OnInit } from '@angular/core';
import { ICapabilityModel } from '../models/interfaces/ICapabilityModel';
import { ICapabilityFormControl } from '../formControls/ICapabilityFormControl';
import { RelationshipCapabilityFormControl } from '../formControls/RelationshipCapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service';
import { PropertyCapabilityFormControl } from '../formControls/PropertyCapabilityFormControl';

@Component({
  selector: 'relationship-definition',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.scss']
})
export class RelationshipComponent implements OnInit {
  @Input() public interfaceId!: string;
  @Input() public formIndex!: [number, number];
  @Input() public relationship!: RelationshipCapabilityFormControl;
  @Input() public panelOpenState!: boolean;

  constructor(public editorService: EditorService) { 
    
  }
 
  public ngOnInit(): void { 
    this.relationship.subscribeModelToForm();
    this.syncHeaderFields();    
  }

  public syncHeaderFields() {
    const id = this.relationship.form.get("id");
    const name = this.relationship.form.get("name");

    id?.valueChanges.subscribe(value => {      
      id.setValue(value, { emitEvent: false })
    });

    name?.valueChanges.subscribe(value => {
      name.setValue(value, { emitEvent: false })
    });    
  }

  public getProperties(): Array<PropertyCapabilityFormControl> {
    return (<RelationshipCapabilityFormControl>this.relationship).properties;
  }
}
