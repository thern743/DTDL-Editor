import 'reflect-metadata';
import { FormBuilder, FormGroup } from "@angular/forms";
import { jsonObject } from "typedjson";
import { ICapabilityDto } from './ICapabilityDto';
import { PropertyCapabilityDto } from './PropertyCapabilityDto';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

export class PropertyCapabilityFormControl extends AbstractCapabilityFormControl<PropertyCapabilityDto> {
  constructor(formBuilder: FormBuilder) {  
    super(formBuilder);
    this.capability = new PropertyCapabilityDto();
    this.toFormGroup();
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
      // Property specific
      schema: [this.capability.schema],
      semanticType: [this.capability.semanticType],
      writable: [this.capability.writable]
    });

    return this.form;
  }

  public getValue(): ICapabilityDto {
    return this.capability;
  }
}
