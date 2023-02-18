import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapKeyFormControl } from "../formControls/MapKeyFormControl";
import { MapValueFormControl } from "../formControls/MapValueFormControl";
import { StringSchemaFormControl } from "../formControls/schemas/StringSchemaFormControl";
import { MapKeyCapabilityModel } from "../models/MapKeyCapabilityModel";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { StringSchemaCapabilityModel } from "../models/schemas/StringSchemaCapabilityModel";
import { RegisterFormFactoryMethod, RegisterModelFactoryMethod } from "../reflection/ReflectionMetadata";
import { ValidationService } from "../services/validation/validation-service.service";

@RegisterModelFactoryMethod({
  type: "Primitive",
  name: "string",
  factoryMethod: "modelFactory"
})
@RegisterModelFactoryMethod({
  type: "MapKey",
  name: "string",
  factoryMethod: "mapKeyModelFactory"
})
@RegisterModelFactoryMethod({
  type: "MapValue",
  name: "string",
  factoryMethod: "mapValueModelFactory"
})
@RegisterFormFactoryMethod({
  type: "Primitive",
  name: "string",
  factoryMethod: "formFactory"
})
@RegisterFormFactoryMethod({
  type: "MapKey",
  name: "string",
  factoryMethod: "mapKeyFormFactory"
})
@RegisterFormFactoryMethod({
  type: "MapValue",
  name: "string",
  factoryMethod: "formFactory"
})
export class StringSchemaFactory {
  constructor() {
  }

  public static modelFactory(): (id: string) => StringSchemaCapabilityModel {
    return (id: string) => new StringSchemaCapabilityModel(id);
  }

  public static formFactory(): (model: StringSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) => StringSchemaFormControl {
    return (model: StringSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) =>
      new StringSchemaFormControl(model, formBuilder, validationService, dialog);
  }

  public static mapKeyModelFactory(): (dtmi: string, model: StringSchemaCapabilityModel) => MapKeyCapabilityModel<StringSchemaCapabilityModel> {
    return (dtmi: string, model: StringSchemaCapabilityModel) => new MapKeyCapabilityModel<StringSchemaCapabilityModel>(dtmi, model);
  }

  public static mapKeyFormFactory(): (model: MapKeyCapabilityModel<StringSchemaCapabilityModel>, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) => MapKeyFormControl {
    return (model: MapKeyCapabilityModel<StringSchemaCapabilityModel>, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) => new MapKeyFormControl(model, formBuilder, validationService, dialog);
  }

  public static mapValueModelFactory(): (dtmi: string, model: StringSchemaCapabilityModel) => MapValueCapabilityModel<StringSchemaCapabilityModel> {
    return (dtmi: string, model: StringSchemaCapabilityModel) => new MapValueCapabilityModel<StringSchemaCapabilityModel>(dtmi, model);
  }

  public static mapValueFormFactory(): (model: MapValueCapabilityModel<StringSchemaCapabilityModel>, fb: FormBuilder, validationService: ValidationService, dialog: MatDialog) => MapValueFormControl {
    return (model: MapValueCapabilityModel<StringSchemaCapabilityModel>, fb: FormBuilder, validationService: ValidationService, dialog: MatDialog) => new MapValueFormControl(model, fb, validationService, dialog);
  }
}