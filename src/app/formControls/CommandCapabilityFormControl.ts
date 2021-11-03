import { FormBuilder, FormGroup } from "@angular/forms";
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { CommandCapabilityModel } from '../models/CommandCapabilityModel';

export class CommandCapabilityFormControl extends AbstractCapabilityFormControl<CommandCapabilityModel> {
  constructor(model: CommandCapabilityModel, formBuilder: FormBuilder) {  
    super(formBuilder);
    this.model = model;
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
      // Command specific
      commandType: [this.model.commandType],
      request: [this.model.request],
      response: [this.model.response]
    });

    return this.form;
  }
}

