import { FormBuilder, FormGroup } from "@angular/forms";
import { ComponentCapabilityModel } from '../models/ComponentCapabilityModel';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

export class ComponentCapabilityFormControl extends AbstractCapabilityFormControl<ComponentCapabilityModel>  {
  constructor(model: ComponentCapabilityModel, formBuilder: FormBuilder) {  
    super(formBuilder);
    this.model = model;
    this.form = this.toFormGroup();
  }
  
  public toFormGroup(): FormGroup {
    let form = this.formBuilder.group({
      id: [this.model.id],
      type: [this.model.type],
      displayName: [this.model.displayName],
      name: [this.model.name],
      comment: [this.model.comment],
      description: [this.model.description],
      // Component specific
      schema: [this.model.schema]
    });

    return form;
  }
}
