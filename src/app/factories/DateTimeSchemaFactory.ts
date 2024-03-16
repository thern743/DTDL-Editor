import { UntypedFormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapValueFormControl } from "../formControls/MapValueFormControl";
import { DateTimeSchemaFormControl } from "../formControls/schemas/DateTimeSchemaFormControl";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { DateTimeSchemaCapabilityModel } from "../models/schemas/DateTimeSchemaCapabilityModel";
import { RegisterFormFactoryMethod, RegisterModelFactoryMethod } from "../reflection/ReflectionMetadata";
import { ValidationService } from "../services/validation/validation-service.service";
import { SchemaService } from "../services/schema/schema.service";

@RegisterModelFactoryMethod({
  type: "Primitive",
  name: "datetime",
  factoryMethod: "modelFactory"
})
@RegisterModelFactoryMethod({
  type: "MapValue",
  name: "datetime",
  factoryMethod: "mapValueModelFactory"
})
@RegisterFormFactoryMethod({
  type: "Primitive",
  name: "datetime",
  factoryMethod: "formFactory"
})
@RegisterFormFactoryMethod({
  type: "MapValue",
  name: "datetime",
  factoryMethod: "formFactory"
})
export class DateTimeSchemaFactory {
  constructor() {
  }

  public static modelFactory(): (id: string) => DateTimeSchemaCapabilityModel {
    return (id: string) => new DateTimeSchemaCapabilityModel(id);
  }

  public static formFactory(): (model: DateTimeSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) => DateTimeSchemaFormControl {
    return (model: DateTimeSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) =>
      new DateTimeSchemaFormControl(model, formBuilder, validationService, dialog);
  }

  public static mapValueModelFactory(): (dtmi: string, model: DateTimeSchemaCapabilityModel) => MapValueCapabilityModel<DateTimeSchemaCapabilityModel> {
    return (dtmi: string, model: DateTimeSchemaCapabilityModel) => new MapValueCapabilityModel<DateTimeSchemaCapabilityModel>(dtmi, model);
  }

  public static mapValueFormFactory(): (model: MapValueCapabilityModel<DateTimeSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => MapValueFormControl {
    return (model: MapValueCapabilityModel<DateTimeSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => new MapValueFormControl(model, fb, validationService, schemaService, dialog);
  }
}