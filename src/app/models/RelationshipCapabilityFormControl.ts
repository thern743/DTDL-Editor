import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapabilityDto } from './ICapabilityDto';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { RelationshipCapabilityDto } from './RelationshipCapabilityDto';
import { PropertyCapabilityFormControl } from './PropertyCapabilityFormControl';
import { ICapabilityFormControl } from './ICapabilityFormControl';

export class RelationshipCapabilityFormControl extends AbstractCapabilityFormControl<RelationshipCapabilityDto> {
  public properties: ICapabilityFormControl<ICapabilityDto>[];
  
  constructor(formBuilder: FormBuilder) {  
    super(formBuilder);
    this.properties = new Array<PropertyCapabilityFormControl>();
    this.capability = new RelationshipCapabilityDto();
  }

  public toFormGroup(): FormGroup {
    this.form = this.formBuilder.group({
      index: [this.index],
      id: [this.capability.id],
      type: [this.capability.type],
      displayName: [this.capability.displayName],
      name: [this.capability.name],
      comment: [this.capability.comment],
      description: [this.capability.description],
      // Relationship specific
      minMultiplicity: [this.capability.minMultiplicity],
      maxMultiplicity: [this.capability.maxMultiplicity],
      target: [this.capability.target],
      writable: [this.capability.writable],
      properties: [this.properties]
    });

    return this.form;
  }

  public getValue(): ICapabilityDto {
    return this.capability;
  }
}
