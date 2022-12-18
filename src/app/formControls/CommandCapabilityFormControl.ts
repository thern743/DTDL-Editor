import { FormBuilder, FormGroup } from "@angular/forms";
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { CommandCapabilityModel } from '../models/CommandCapabilityModel';
import { ValidationService } from "../services/validation/validation-service.service";

export class CommandCapabilityFormControl extends AbstractCapabilityFormControl<CommandCapabilityModel> {
  private _validationService: ValidationService;
  
  constructor(model: CommandCapabilityModel, validationService: ValidationService, formBuilder: FormBuilder) {  
    super(formBuilder);
    this._validationService = validationService;
    this.model = model;
    this.form = this.toFormGroup();
  }
    
  public toFormGroup(): FormGroup {
    let form = this.formBuilder.group({
      id: [this.model.id, [this._validationService.validDtmi()]],
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

    return form;
  }
}

