import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapabilityModel } from '../models/ICapabilityModel';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { CommandCapabilityDto } from '../models/CommandCapabilityModel';

export class CommandCapabilityFormControl extends AbstractCapabilityFormControl<CommandCapabilityDto> {
  constructor(formBuilder: FormBuilder) {  
    super(formBuilder);
    this.model = new CommandCapabilityDto();
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
      // Command specific
      commandType: [this.model.commandType],
      request: [this.model.request],
      response: [this.model.response]
    });

    return this.form;
  }

  public getValue(): ICapabilityModel {
    return this.model;
  }
}

