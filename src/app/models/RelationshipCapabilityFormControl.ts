import 'reflect-metadata';
import { FormBuilder, FormGroup } from "@angular/forms";
import { jsonObject } from "typedjson";
import { ICapabilityDto } from './ICapabilityDto';
import { RelationshipCapabilityDto } from './RelationshipCapabilityDto';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

@jsonObject
export class RelationshipCapabilityFormControl extends AbstractCapabilityFormControl<RelationshipCapabilityDto> {
  public index: number = -1;
  public formBuilder: FormBuilder
  public capability: RelationshipCapabilityDto;  
  public form!: FormGroup;

  constructor(formBuilder: FormBuilder) {  
    super();
    this.formBuilder = formBuilder;   
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
      properties: this.formBuilder.array([...this.capability.properties])
    });

    return this.form;
  }

  public getValue(): ICapabilityDto {
    return this.capability;
  }
}
