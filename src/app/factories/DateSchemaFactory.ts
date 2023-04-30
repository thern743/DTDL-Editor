import { UntypedFormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapValueFormControl } from "../formControls/MapValueFormControl";
import { DateSchemaFormControl } from "../formControls/schemas/DateSchemaFormControl";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { DateSchemaCapabilityModel } from "../models/schemas/DateSchemaCapabilityModel";
import { RegisterFormFactoryMethod, RegisterModelFactoryMethod } from "../reflection/ReflectionMetadata";
import { ValidationService } from "../services/validation/validation-service.service";
import { SchemaService } from "../services/schema/schema.service";

@RegisterModelFactoryMethod({
  type: "Primitive",
  name: "date",
  factoryMethod: "modelFactory"
})
@RegisterModelFactoryMethod({
  type: "MapValue",
  name: "date",
  factoryMethod: "mapValueModelFactory"
})
@RegisterFormFactoryMethod({
  type: "Primitive",
  name: "date",
  factoryMethod: "formFactory"
})
@RegisterFormFactoryMethod({
  type: "MapValue",
  name: "date",
  factoryMethod: "formFactory"
})
export class DateSchemaFactory {
  constructor() {
  }


  public static modelFactory(): (id: string) => DateSchemaCapabilityModel {
    return (id: string) => new DateSchemaCapabilityModel(id);
  }

  public static formFactory(): (model: DateSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) => DateSchemaFormControl {
    return (model: DateSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) =>
      new DateSchemaFormControl(model, formBuilder, validationService, dialog);
  }

  public static mapValueModelFactory(): (dtmi: string, model: DateSchemaCapabilityModel) => MapValueCapabilityModel<DateSchemaCapabilityModel> {
    return (dtmi: string, model: DateSchemaCapabilityModel) => new MapValueCapabilityModel<DateSchemaCapabilityModel>(dtmi, model);
  }

  public static mapValueFormFactory(): (model: MapValueCapabilityModel<DateSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => MapValueFormControl {
    return (model: MapValueCapabilityModel<DateSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => new MapValueFormControl(model, fb, validationService, schemaService, dialog);
  }
}