import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapValueFormControl } from "../formControls/MapValueFormControl";
import { EnumSchemaFormControl } from "../formControls/schemas/EnumSchemaFormControl";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { EnumSchemaCapabilityModel } from "../models/schemas/EnumSchemaCapabilityModel";
import { RegisterFormFactoryMethod, RegisterModelFactoryMethod } from "../reflection/ReflectionMetadata";
import { ValidationService } from "../services/validation/validation-service.service";

@RegisterModelFactoryMethod({
  type: "Complex",
  name: "enum",
  factoryMethod: "modelFactory"
})
@RegisterModelFactoryMethod({
  type: "MapValue",
  name: "enum",
  factoryMethod: "mapValueModelFactory"
})
@RegisterFormFactoryMethod({
  type: "Complex",
  name: "enum",
  factoryMethod: "formFactory"
})
@RegisterFormFactoryMethod({
  type: "MapValue",
  name: "enum",
  factoryMethod: "formFactory"
})
export class EnumSchemaFactory {
  constructor() {
  }

  public static modelFactory(): (id: string) => EnumSchemaCapabilityModel {
    return (id: string) => new EnumSchemaCapabilityModel(id);
  }

  public static formFactory(): (model: EnumSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) => EnumSchemaFormControl {
    return (model: EnumSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) =>
      new EnumSchemaFormControl(model, validationService, formBuilder, dialog);
  }

  public static mapValueModelFactory(): (dtmi: string, model: EnumSchemaCapabilityModel) => MapValueCapabilityModel<EnumSchemaCapabilityModel> {
    return (dtmi: string, model: EnumSchemaCapabilityModel) => new MapValueCapabilityModel<EnumSchemaCapabilityModel>(dtmi, model);
  }

  public static mapValueFormFactory(): (model: MapValueCapabilityModel<EnumSchemaCapabilityModel>, fb: FormBuilder, validationService: ValidationService, dialog: MatDialog) => MapValueFormControl {
    return (model: MapValueCapabilityModel<EnumSchemaCapabilityModel>, fb: FormBuilder, validationService: ValidationService, dialog: MatDialog) => new MapValueFormControl(model, fb, validationService, dialog);
  }
}