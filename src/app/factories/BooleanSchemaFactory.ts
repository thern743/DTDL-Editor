import { UntypedFormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapValueFormControl } from "../formControls/MapValueFormControl";
import { BooleanSchemaFormControl } from "../formControls/schemas/BooleanSchemaFormControl";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { BooleanSchemaCapabilityModel } from "../models/schemas/BooleanSchemaCapabilityModel";
import { RegisterFormFactoryMethod, RegisterModelFactoryMethod } from "../reflection/ReflectionMetadata";
import { ValidationService } from "../services/validation/validation-service.service";
import { SchemaService } from "../services/schema/schema.service";

@RegisterModelFactoryMethod({
  type: "Primitive",
  name: "boolean",
  factoryMethod: "modelFactory"
})
@RegisterModelFactoryMethod({
  type: "MapValue",
  name: "boolean",
  factoryMethod: "mapValueModelFactory"
})
@RegisterFormFactoryMethod({
  type: "Primitive",
  name: "boolean",
  factoryMethod: "formFactory"
})
@RegisterFormFactoryMethod({
  type: "MapValue",
  name: "boolean",
  factoryMethod: "formFactory"
})
export class BooleanSchemaFactory {
  constructor() {
  }

  public static modelFactory(): (id: string) => BooleanSchemaCapabilityModel {
    return (id: string) => new BooleanSchemaCapabilityModel(id);
  }

  public static formFactory(): (model: BooleanSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) => BooleanSchemaFormControl {
    return (model: BooleanSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) =>
      new BooleanSchemaFormControl(model, formBuilder, validationService, dialog);
  }

  public static mapValueModelFactory(): (dtmi: string, model: BooleanSchemaCapabilityModel) => MapValueCapabilityModel<BooleanSchemaCapabilityModel> {
    return (dtmi: string, model: BooleanSchemaCapabilityModel) => new MapValueCapabilityModel<BooleanSchemaCapabilityModel>(dtmi, model);
  }

  public static mapValueFormFactory(): (model: MapValueCapabilityModel<BooleanSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => MapValueFormControl {
    return (model: MapValueCapabilityModel<BooleanSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => new MapValueFormControl(model, fb, validationService, schemaService, dialog);
  }
}