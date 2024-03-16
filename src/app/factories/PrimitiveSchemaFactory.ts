import { UntypedFormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapValueFormControl } from "../formControls/MapValueFormControl";
import { PrimitiveSchemaFormControl } from "../formControls/schemas/PrimitiveSchemaFormControl";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { PrimitiveSchemaCapabilityModel } from "../models/schemas/PrimitiveSchemaCapabilityModel";
import { RegisterFormFactoryMethod, RegisterModelFactoryMethod } from "../reflection/ReflectionMetadata";
import { ValidationService } from "../services/validation/validation-service.service";
import { SchemaService } from "../services/schema/schema.service";

@RegisterModelFactoryMethod({
  type: "Primitive",
  name: "primitive",
  factoryMethod: "modelFactory"
})
@RegisterModelFactoryMethod({
  type: "MapValue",
  name: "primitive",
  factoryMethod: "mapValueModelFactory"
})
@RegisterFormFactoryMethod({
  type: "Primitive",
  name: "primitive",
  factoryMethod: "formFactory"
})
@RegisterFormFactoryMethod({
  type: "MapValue",
  name: "primitive",
  factoryMethod: "formFactory"
})
export class PrimitiveSchemaFactory {
  constructor() {
  }

  public static modelFactory(): (id: string) => PrimitiveSchemaCapabilityModel {
    return (id: string) => new PrimitiveSchemaCapabilityModel(id);
  }

  public static formFactory(): (model: PrimitiveSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) => PrimitiveSchemaFormControl {
    return (model: PrimitiveSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) =>
      new PrimitiveSchemaFormControl(model, formBuilder, validationService, dialog);
  }

  public static mapValueModelFactory(): (dtmi: string, model: PrimitiveSchemaCapabilityModel) => MapValueCapabilityModel<PrimitiveSchemaCapabilityModel> {
    return (dtmi: string, model: PrimitiveSchemaCapabilityModel) => new MapValueCapabilityModel<PrimitiveSchemaCapabilityModel>(dtmi, model);
  }

  public static mapValueFormFactory(): (model: MapValueCapabilityModel<PrimitiveSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => MapValueFormControl {
    return (model: MapValueCapabilityModel<PrimitiveSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => new MapValueFormControl(model, fb, validationService, schemaService, dialog);
  }
}