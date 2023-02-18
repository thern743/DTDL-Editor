import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapValueFormControl } from "../formControls/MapValueFormControl";
import { DurationSchemaFormControl } from "../formControls/schemas/DurationSchemaFormControl";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { DurationSchemaCapabilityModel } from "../models/schemas/DurationSchemaCapabilityModel";
import { RegisterFormFactoryMethod, RegisterModelFactoryMethod } from "../reflection/ReflectionMetadata";
import { ValidationService } from "../services/validation/validation-service.service";

@RegisterModelFactoryMethod({
  type: "Primitive",
  name: "duration",
  factoryMethod: "modelFactory"
})
@RegisterModelFactoryMethod({
  type: "MapValue",
  name: "duration",
  factoryMethod: "mapValueModelFactory"
})
@RegisterFormFactoryMethod({
  type: "Primitive",
  name: "duration",
  factoryMethod: "formFactory"
})
@RegisterFormFactoryMethod({
  type: "MapValue",
  name: "duration",
  factoryMethod: "formFactory"
})
export class DurationSchemaFactory {
  constructor() {
  }

  public static modelFactory(): (id: string) => DurationSchemaCapabilityModel {
    return (id: string) => new DurationSchemaCapabilityModel(id);
  }

  public static formFactory(): (model: DurationSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) => DurationSchemaFormControl {
    return (model: DurationSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) =>
      new DurationSchemaFormControl(model, formBuilder, validationService, dialog);
  }

  public static mapValueModelFactory(): (dtmi: string, model: DurationSchemaCapabilityModel) => MapValueCapabilityModel<DurationSchemaCapabilityModel> {
    return (dtmi: string, model: DurationSchemaCapabilityModel) => new MapValueCapabilityModel<DurationSchemaCapabilityModel>(dtmi, model);
  }

  public static mapValueFormFactory(): (model: MapValueCapabilityModel<DurationSchemaCapabilityModel>, fb: FormBuilder, validationService: ValidationService, dialog: MatDialog) => MapValueFormControl {
    return (model: MapValueCapabilityModel<DurationSchemaCapabilityModel>, fb: FormBuilder, validationService: ValidationService, dialog: MatDialog) => new MapValueFormControl(model, fb, validationService, dialog);
  }
}