import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { CommandPayloadFormControl } from "../formControls/CommandPayloadFormControl";
import { CommandPayload } from "../models/CommandPayload";
import { RegisterFormFactoryMethod, RegisterModelFactoryMethod } from "../reflection/ReflectionMetadata";
import { ValidationService } from "../services/validation/validation-service.service";

@RegisterModelFactoryMethod({
  type: "Utility",
  name: "commandPayload",
  factoryMethod: "modelFactory"
})
@RegisterFormFactoryMethod({
  type: "Utility",
  name: "commandPayload",
  factoryMethod: "formFactory"
})
export class CommandPayloadFactory {
  constructor() {
  }

  public static modelFactory(): (id: string) => CommandPayload {
    return (id: string) => 
    {
      return new CommandPayload(id);
    }
  }

  public static formFactory(): (model: CommandPayload, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) => CommandPayloadFormControl {
    return (model: CommandPayload, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) =>
      new CommandPayloadFormControl(model, formBuilder, validationService, dialog);
  }
}