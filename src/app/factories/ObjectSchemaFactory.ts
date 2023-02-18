import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapValueFormControl } from "../formControls/MapValueFormControl";
import { ObjectSchemaFormControl } from "../formControls/schemas/ObjectSchemaFormControl";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { ObjectSchemaCapabilityModel } from "../models/schemas/ObjectSchemaCapabilityModel";
import { RegisterFormFactoryMethod, RegisterModelFactoryMethod } from "../reflection/ReflectionMetadata";
import { ValidationService } from "../services/validation/validation-service.service";

@RegisterModelFactoryMethod({
  type: "Complex",
  name: "object",
  factoryMethod: "modelFactory"
})
@RegisterModelFactoryMethod({
  type: "MapValue",
  name: "object",
  factoryMethod: "mapValueModelFactory"
})
@RegisterFormFactoryMethod({
  type: "Complex",
  name: "object",
  factoryMethod: "formFactory"
})
@RegisterFormFactoryMethod({
  type: "MapValue",
  name: "object",
  factoryMethod: "formFactory"
})
export class ObjectSchemaFactory {
  constructor() {
  }

  public static modelFactory(): (id: string) => ObjectSchemaCapabilityModel {
    return (id: string) => new ObjectSchemaCapabilityModel(id);
  }

  public static formFactory(): (model: ObjectSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) => ObjectSchemaFormControl {
    return (model: ObjectSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) =>
      new ObjectSchemaFormControl(model, formBuilder, validationService, dialog);
  }

  public static mapValueModelFactory(): (dtmi: string, model: ObjectSchemaCapabilityModel) => MapValueCapabilityModel<ObjectSchemaCapabilityModel> {
    return (dtmi: string, model: ObjectSchemaCapabilityModel) => new MapValueCapabilityModel<ObjectSchemaCapabilityModel>(dtmi, model);
  }

  public static mapValueFormFactory(): (model: MapValueCapabilityModel<ObjectSchemaCapabilityModel>, fb: FormBuilder, validationService: ValidationService, dialog: MatDialog) => MapValueFormControl {
    return (model: MapValueCapabilityModel<ObjectSchemaCapabilityModel>, fb: FormBuilder, validationService: ValidationService, dialog: MatDialog) => new MapValueFormControl(model, fb, validationService, dialog);
  }
}