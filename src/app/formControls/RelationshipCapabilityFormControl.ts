import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapabilityModel } from '../models/ICapabilityModel';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { RelationshipCapabilityModel } from '../models/RelationshipCapabilityModel';
import { PropertyCapabilityFormControl } from './PropertyCapabilityFormControl';
import { ICapabilityFormControl } from './ICapabilityFormControl';

export class RelationshipCapabilityFormControl extends AbstractCapabilityFormControl<RelationshipCapabilityModel> {
  public properties: ICapabilityFormControl<ICapabilityModel>[];
  
  constructor(formBuilder: FormBuilder) {  
    super(formBuilder);
    this.properties = new Array<PropertyCapabilityFormControl>();
    this.model = new RelationshipCapabilityModel("New Relationship");
    this.form = this.toFormGroup();
  }
  
  public toFormGroup(): FormGroup {
    this.form = this.formBuilder.group({
      index: [this.index],
      id: [this.model.id],
      type: [this.model.type],
      displayName: [this.model.displayName],
      name: [this.model.name],
      comment: [this.model.comment],
      description: [this.model.description],
      // Relationship specific
      minMultiplicity: [this.model.minMultiplicity],
      maxMultiplicity: [this.model.maxMultiplicity],
      target: [this.model.target],
      writable: [this.model.writable],
      properties: this.formBuilder.array([...this.model.properties])
    });

    return this.form;
  }
}
