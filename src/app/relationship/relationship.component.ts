import { Component, Input, OnInit } from '@angular/core';
import { RelationshipCapabilityFormControl } from '../formControls/RelationshipCapabilityFormControl';
import { EditorService } from '../services/editor/editor.service';
import { PropertyCapabilityFormControl } from '../formControls/PropertyCapabilityFormControl';
import { FormControl } from '@angular/forms';

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
  private _editorService: EditorService

  constructor(editorService: EditorService) {
    this._editorService = editorService;
  }
 
  public ngOnInit(): void { 
    this.relationship.subscribeModelToForm(this.relationship.form);
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

  public getFormControl(name: string): FormControl {
    return this.relationship.form.get(name) as FormControl;
  }

  public getProperties(): Array<PropertyCapabilityFormControl> {
    return (<RelationshipCapabilityFormControl>this.relationship).properties;
  }

  public filterInterfacesForExtends(interfaceId: string): Array<string> {
    return this._editorService.filterInterfacesForExtends(interfaceId)
  }

  public addPropertyToRelationship(relationship: RelationshipCapabilityFormControl) {
    this._editorService.addPropertyToRelationship(relationship);
  }
}
