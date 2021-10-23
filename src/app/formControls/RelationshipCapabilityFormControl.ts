import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapabilityModel } from '../models/ICapabilityModel';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { RelationshipCapabilityDto } from '../models/RelationshipCapabilityModel';
import { PropertyCapabilityFormControl } from './PropertyCapabilityFormControl';
import { ICapabilityFormControl } from './ICapabilityFormControl';

export class RelationshipCapabilityFormControl extends AbstractCapabilityFormControl<RelationshipCapabilityDto> {
  public properties: ICapabilityFormControl<ICapabilityModel>[];
  
  constructor(formBuilder: FormBuilder) {  
    super(formBuilder);
    this.properties = new Array<PropertyCapabilityFormControl>();
    this.model = new RelationshipCapabilityDto();
    this.toFormGroup();
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
      properties: [this.properties]
    });

    return this.form;
  }

  public getValue(): ICapabilityModel {
    return this.model;
  }
}
