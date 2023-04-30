import { UntypedFormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapValueFormControl } from "../formControls/MapValueFormControl";
import { TimeSchemaFormControl } from "../formControls/schemas/TimeSchemaFormControl";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { TimeSchemaCapabilityModel } from "../models/schemas/TimeSchemaCapabilityModel";
import { RegisterFormFactoryMethod, RegisterModelFactoryMethod } from "../reflection/ReflectionMetadata";
import { ValidationService } from "../services/validation/validation-service.service";
import { SchemaService } from "../services/schema/schema.service";

@RegisterModelFactoryMethod({
  type: "Primitive",
  name: "time",
  factoryMethod: "modelFactory"
})
@RegisterModelFactoryMethod({
  type: "MapValue",
  name: "time",
  factoryMethod: "mapValueModelFactory"
})
@RegisterFormFactoryMethod({
  type: "Primitive",
  name: "time",
  factoryMethod: "formFactory"
})
@RegisterFormFactoryMethod({
  type: "MapValue",
  name: "time",
  factoryMethod: "formFactory"
})
export class TimeSchemaFactory {
  constructor() {
  }

  public static modelFactory(): (id: string) => TimeSchemaCapabilityModel {
    return (id: string) => new TimeSchemaCapabilityModel(id);
  }

  public static formFactory(): (model: TimeSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) => TimeSchemaFormControl {
    return (model: TimeSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) =>
      new TimeSchemaFormControl(model, formBuilder, validationService, dialog);
  }

  public static mapValueModelFactory(): (dtmi: string, model: TimeSchemaCapabilityModel) => MapValueCapabilityModel<TimeSchemaCapabilityModel> {
    return (dtmi: string, model: TimeSchemaCapabilityModel) => new MapValueCapabilityModel<TimeSchemaCapabilityModel>(dtmi, model);
  }

  public static mapValueFormFactory(): (model: MapValueCapabilityModel<TimeSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => MapValueFormControl {
    return (model: MapValueCapabilityModel<TimeSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => new MapValueFormControl(model, fb, validationService, schemaService, dialog);
  }
}