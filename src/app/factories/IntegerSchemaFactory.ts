import { UntypedFormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapValueFormControl } from "../formControls/MapValueFormControl";
import { IntegerSchemaFormControl } from "../formControls/schemas/IntegerSchemaFormControl";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { IntegerSchemaCapabilityModel } from "../models/schemas/IntegerSchemaCapabilityModel";
import { RegisterFormFactoryMethod, RegisterModelFactoryMethod } from "../reflection/ReflectionMetadata";
import { ValidationService } from "../services/validation/validation-service.service";
import { SchemaService } from "../services/schema/schema.service";

@RegisterModelFactoryMethod({
  type: "Primitive",
  name: "integer",
  factoryMethod: "modelFactory"
})
@RegisterModelFactoryMethod({
  type: "MapValue",
  name: "integer",
  factoryMethod: "mapValueModelFactory"
})
@RegisterFormFactoryMethod({
  type: "Primitive",
  name: "integer",
  factoryMethod: "formFactory"
})
@RegisterFormFactoryMethod({
  type: "MapValue",
  name: "integer",
  factoryMethod: "formFactory"
})
export class IntegerSchemaFactory {
  constructor() {
  }

  public static modelFactory(): (id: string) => IntegerSchemaCapabilityModel {
    return (id: string) => new IntegerSchemaCapabilityModel(id);
  }

  public static formFactory(): (model: IntegerSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) => IntegerSchemaFormControl {
    return (model: IntegerSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) =>
      new IntegerSchemaFormControl(model, formBuilder, validationService, dialog);
  }

  public static mapValueModelFactory(): (dtmi: string, model: IntegerSchemaCapabilityModel) => MapValueCapabilityModel<IntegerSchemaCapabilityModel> {
    return (dtmi: string, model: IntegerSchemaCapabilityModel) => new MapValueCapabilityModel<IntegerSchemaCapabilityModel>(dtmi, model);
  }

  public static mapValueFormFactory(): (model: MapValueCapabilityModel<IntegerSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => MapValueFormControl {
    return (model: MapValueCapabilityModel<IntegerSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => new MapValueFormControl(model, fb, validationService, schemaService, dialog);
  }
}