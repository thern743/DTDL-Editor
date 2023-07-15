import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { CommandCapabilityModel } from '../models/CommandCapabilityModel';
import { ValidationService } from "../services/validation/validation-service.service";
import { InterfaceCapabilityFormControl } from "./InterfaceCapabilityFormControl";

export class CommandCapabilityFormControl extends AbstractCapabilityFormControl<CommandCapabilityModel> {
  private _validationService: ValidationService;
  
  constructor(interfaceInstance: InterfaceCapabilityFormControl, model: CommandCapabilityModel, validationService: ValidationService, formBuilder: UntypedFormBuilder) {  
    super(formBuilder);
    this._validationService = validationService;
    this.model = model;
    this.form = this.toFormGroup(model);
    this.interface = interfaceInstance;
  }
    
  public toFormGroup(model: CommandCapabilityModel): UntypedFormGroup {
    let form = this.formBuilder.group({
      "@id": [model["@id"], [this._validationService.validDtmi()]],
      "@type": [model["@type"]],
      displayName: [model.displayName],
      comment: [model.comment],
      description: [model.description],
      // Command specific
      name: [model.name],
      commandType: [model.commandType],
      request: [model.request],
      response: [model.response]
    });

    return form;
  }
}

