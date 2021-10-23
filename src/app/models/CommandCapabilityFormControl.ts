import 'reflect-metadata';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapabilityDto } from './ICapabilityDto';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { CommandCapabilityDto } from './CommandCapabilityDto';

export class CommandCapabilityFormControl extends AbstractCapabilityFormControl<CommandCapabilityDto> {
  constructor(formBuilder: FormBuilder) {  
    super(formBuilder);
    this.capability = new CommandCapabilityDto();
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
      // Command specific
      commandType: [this.capability.commandType],
      request: [this.capability.request],
      response: [this.capability.response]
    });

    return this.form;
  }

  public getValue(): ICapabilityDto {
    return this.capability;
  }
}

