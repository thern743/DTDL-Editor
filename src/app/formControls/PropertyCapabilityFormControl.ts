import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapabilityModel } from '../models/ICapabilityModel';
import { PropertyCapabilityDto } from '../models/PropertyCapabilityModel';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

export class PropertyCapabilityFormControl extends AbstractCapabilityFormControl<PropertyCapabilityDto> {
  constructor(formBuilder: FormBuilder) {  
    super(formBuilder);
    this.model = new PropertyCapabilityDto();
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
      // Property specific
      schema: [this.model.schema],
      semanticType: [this.model.semanticType],
      writable: [this.model.writable]
    });

    return this.form;
  }

  public getValue(): ICapabilityModel {
    return this.model;
  }
}
