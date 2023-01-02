import { FormBuilder, FormGroup } from "@angular/forms";
import { CommandPayload } from "../models/CommandPayload";
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from "./AbstractCapabilityFormControl";

export class CommandPayloadFormControl extends AbstractCapabilityFormControl<CommandPayload> {
  private _validationService: ValidationService;

  constructor(model: CommandPayload, formBuilder: FormBuilder, validationService: ValidationService) {
    super(formBuilder);
    this._validationService = validationService;
    this.model = model;
    this.form = this.toFormGroup();
  }

  public toFormGroup(): FormGroup { 
    let form = this.formBuilder.group({
      id: [this.model.id, [this._validationService.validDtmi()]],
      name: [this.model.name],
      type: [this.model.type],
      displayName: [this.model.displayName],
      comment: [this.model.comment],
      description: [this.model.description],
      // CommandPayload specific
      schema: [this.model.schema]
    });

    return form;
  }
}