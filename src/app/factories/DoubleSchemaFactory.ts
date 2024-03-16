import { UntypedFormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapValueFormControl } from "../formControls/MapValueFormControl";
import { DoubleSchemaFormControl } from "../formControls/schemas/DoubleSchemaFormControl";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { DoubleSchemaCapabilityModel } from "../models/schemas/DoubleSchemaCapabilityModel";
import { RegisterFormFactoryMethod, RegisterModelFactoryMethod } from "../reflection/ReflectionMetadata";
import { ValidationService } from "../services/validation/validation-service.service";
import { SchemaService } from "../services/schema/schema.service";

@RegisterModelFactoryMethod({
  type: "Primitive",
  name: "double",
  factoryMethod: "modelFactory"
})
@RegisterModelFactoryMethod({
  type: "MapValue",
  name: "double",
  factoryMethod: "mapValueModelFactory"
})
@RegisterFormFactoryMethod({
  type: "Primitive",
  name: "double",
  factoryMethod: "formFactory"
})
@RegisterFormFactoryMethod({
  type: "MapValue",
  name: "double",
  factoryMethod: "formFactory"
})
export class DoubleSchemaFactory {
  constructor() {
  }

  public static modelFactory(): (id: string) => DoubleSchemaCapabilityModel {
    return (id: string) => new DoubleSchemaCapabilityModel(id);
  }

  public static formFactory(): (model: DoubleSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) => DoubleSchemaFormControl {
    return (model: DoubleSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) =>
      new DoubleSchemaFormControl(model, formBuilder, validationService, dialog);
  }

  public static mapValueModelFactory(): (dtmi: string, model: DoubleSchemaCapabilityModel) => MapValueCapabilityModel<DoubleSchemaCapabilityModel> {
    return (dtmi: string, model: DoubleSchemaCapabilityModel) => new MapValueCapabilityModel<DoubleSchemaCapabilityModel>(dtmi, model);
  }

  public static mapValueFormFactory(): (model: MapValueCapabilityModel<DoubleSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => MapValueFormControl {
    return (model: MapValueCapabilityModel<DoubleSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => new MapValueFormControl(model, fb, validationService, schemaService, dialog);
  }
}