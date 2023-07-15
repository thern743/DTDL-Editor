import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { CommandPayload } from "../models/CommandPayload";
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from "./AbstractCapabilityFormControl";

export class CommandPayloadFormControl extends AbstractCapabilityFormControl<CommandPayload> {
  public dialog: MatDialog
  private _validationService: ValidationService;

  constructor(model: CommandPayload, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) {
    super(formBuilder);
    this.dialog = dialog;
    this._validationService = validationService;
    this.model = model;
    this.form = this.toFormGroup(model);
  }

  public toFormGroup(model: CommandPayload): UntypedFormGroup {
    let form = this.formBuilder.group({
      "@id": [model["@id"], [this._validationService.validDtmi()]],
      name: [model.name],
      "@type": [model["@type"]],
      displayName: [model.displayName],
      comment: [model.comment],
      description: [model.description],
      // CommandPayload specific
      schema: [model.schema]
    });

    return form;
  }
}