import { UntypedFormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapValueFormControl } from "../formControls/MapValueFormControl";
import { EnumSchemaFormControl } from "../formControls/schemas/EnumSchemaFormControl";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { EnumSchemaCapabilityModel } from "../models/schemas/EnumSchemaCapabilityModel";
import { RegisterFormFactoryMethod, RegisterModelFactoryMethod } from "../reflection/ReflectionMetadata";
import { ValidationService } from "../services/validation/validation-service.service";
import { SchemaService } from "../services/schema/schema.service";

@RegisterModelFactoryMethod({
  type: "Complex",
  name: "enum",
  factoryMethod: "modelFactory"
})
@RegisterFormFactoryMethod({
  type: "Complex",
  name: "enum",
  factoryMethod: "formFactory"
})
@RegisterModelFactoryMethod({
  type: "MapValue",
  name: "enum",
  factoryMethod: "mapValueModelFactory"
})
@RegisterFormFactoryMethod({
  type: "MapValue",
  name: "enum",
  factoryMethod: "mapValueFormFactory"
})
export class EnumSchemaFactory {
  constructor() {
  }

  public static modelFactory(): (id: string) => EnumSchemaCapabilityModel {
    return (id: string) => new EnumSchemaCapabilityModel(id);
  }

  public static formFactory(): (model: EnumSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) => EnumSchemaFormControl {
    return (model: EnumSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) =>
      new EnumSchemaFormControl(model, validationService, formBuilder, dialog);
  }

  public static mapValueModelFactory(): (dtmi: string, model: EnumSchemaCapabilityModel) => MapValueCapabilityModel<EnumSchemaCapabilityModel> {
    return (dtmi: string, model: EnumSchemaCapabilityModel) => new MapValueCapabilityModel<EnumSchemaCapabilityModel>(dtmi, model);
  }

  public static mapValueFormFactory(): (model: MapValueCapabilityModel<EnumSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => MapValueFormControl {
    return (model: MapValueCapabilityModel<EnumSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => new MapValueFormControl(model, fb, validationService, schemaService, dialog);
  }
}