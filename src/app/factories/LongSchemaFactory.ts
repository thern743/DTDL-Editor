import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapValueFormControl } from "../formControls/MapValueFormControl";
import { LongSchemaFormControl } from "../formControls/schemas/LongSchemaFormControl";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { LongSchemaCapabilityModel } from "../models/schemas/LongSchemaCapabilityModel";
import { RegisterFormFactoryMethod, RegisterModelFactoryMethod } from "../reflection/ReflectionMetadata";
import { ValidationService } from "../services/validation/validation-service.service";

@RegisterModelFactoryMethod({
  type: "Primitive",
  name: "long",
  factoryMethod: "modelFactory"
})
@RegisterModelFactoryMethod({
  type: "MapValue",
  name: "long",
  factoryMethod: "mapValueModelFactory"
})
@RegisterFormFactoryMethod({
  type: "Primitive",
  name: "long",
  factoryMethod: "formFactory"
})
@RegisterFormFactoryMethod({
  type: "MapValue",
  name: "long",
  factoryMethod: "formFactory"
})
export class LongSchemaFactory {
  constructor() {
  }

  public static modelFactory(): (id: string) => LongSchemaCapabilityModel {
    return (id: string) => new LongSchemaCapabilityModel(id);
  }

  public static formFactory(): (model: LongSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) => LongSchemaFormControl {
    return (model: LongSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) =>
      new LongSchemaFormControl(model, formBuilder, validationService, dialog);
  }

  public static mapValueModelFactory(): (dtmi: string, model: LongSchemaCapabilityModel) => MapValueCapabilityModel<LongSchemaCapabilityModel> {
    return (dtmi: string, model: LongSchemaCapabilityModel) => new MapValueCapabilityModel<LongSchemaCapabilityModel>(dtmi, model);
  }

  public static mapValueFormFactory(): (model: MapValueCapabilityModel<LongSchemaCapabilityModel>, fb: FormBuilder, validationService: ValidationService, dialog: MatDialog) => MapValueFormControl {
    return (model: MapValueCapabilityModel<LongSchemaCapabilityModel>, fb: FormBuilder, validationService: ValidationService, dialog: MatDialog) => new MapValueFormControl(model, fb, validationService, dialog);
  }
}