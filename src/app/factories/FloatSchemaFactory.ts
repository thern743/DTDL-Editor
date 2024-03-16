import { UntypedFormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapValueFormControl } from "../formControls/MapValueFormControl";
import { FloatSchemaFormControl } from "../formControls/schemas/FloatSchemaFormControl";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { FloatSchemaCapabilityModel } from "../models/schemas/FloatSchemaCapabilityModel";
import { IFactoryAttributeProperties } from "../reflection/IFactoryAttributeProperties";
import { RegisterFormFactoryMethod, RegisterModelFactoryMethod } from "../reflection/ReflectionMetadata";
import { ValidationService } from "../services/validation/validation-service.service";
import { SchemaService } from "../services/schema/schema.service";

@RegisterModelFactoryMethod({
  type: "Primitive",
  name: "float",
  factoryMethod: "modelFactory"
})
@RegisterModelFactoryMethod({
  type: "MapValue",
  name: "float",
  factoryMethod: "mapValueModelFactory"
})
@RegisterFormFactoryMethod({
  type: "Primitive",
  name: "float",
  factoryMethod: "formFactory"
})
@RegisterFormFactoryMethod({
  type: "MapValue",
  name: "float",
  factoryMethod: "formFactory"
})
export class FloatSchemaFactory {
  constructor() {
  }

  public static modelFactory(): (id: string) => FloatSchemaCapabilityModel {
    return (id: string) => new FloatSchemaCapabilityModel(id);
  }

  public static formFactory(): (model: FloatSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) => FloatSchemaFormControl {
    return (model: FloatSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) =>
      new FloatSchemaFormControl(model, formBuilder, validationService, dialog);
  }

  public static mapValueModelFactory(): (dtmi: string, model: FloatSchemaCapabilityModel) => MapValueCapabilityModel<FloatSchemaCapabilityModel> {
    return (dtmi: string, model: FloatSchemaCapabilityModel) => new MapValueCapabilityModel<FloatSchemaCapabilityModel>(dtmi, model);
  }

  public static mapValueFormFactory(): (model: MapValueCapabilityModel<FloatSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => MapValueFormControl {
    return (model: MapValueCapabilityModel<FloatSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => new MapValueFormControl(model, fb, validationService, schemaService, dialog);
  }
}