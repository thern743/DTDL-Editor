import { UntypedFormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapValueFormControl } from "../formControls/MapValueFormControl";
import { ObjectSchemaFormControl } from "../formControls/schemas/ObjectSchemaFormControl";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { ObjectSchemaCapabilityModel } from "../models/schemas/ObjectSchemaCapabilityModel";
import { RegisterFormFactoryMethod, RegisterModelFactoryMethod } from "../reflection/ReflectionMetadata";
import { ValidationService } from "../services/validation/validation-service.service";
import { SchemaService } from "../services/schema/schema.service";

@RegisterModelFactoryMethod({
  type: "Complex",
  name: "object",
  factoryMethod: "modelFactory"
})
@RegisterFormFactoryMethod({
  type: "Complex",
  name: "object",
  factoryMethod: "formFactory"
})
@RegisterModelFactoryMethod({
  type: "MapValue",
  name: "object",
  factoryMethod: "mapValueModelFactory"
})
@RegisterFormFactoryMethod({
  type: "MapValue",
  name: "object",
  factoryMethod: "mapValueFormFactory"
})
export class ObjectSchemaFactory {
  constructor() {
  }

  public static modelFactory(): (id: string) => ObjectSchemaCapabilityModel {
    return (id: string) => new ObjectSchemaCapabilityModel(id);
  }

  public static formFactory(): (model: ObjectSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) => ObjectSchemaFormControl {
    return (model: ObjectSchemaCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) =>
      new ObjectSchemaFormControl(model, validationService, formBuilder, dialog);
  }

  public static mapValueModelFactory(): (dtmi: string, model: ObjectSchemaCapabilityModel) => MapValueCapabilityModel<ObjectSchemaCapabilityModel> {
    return (dtmi: string, model: ObjectSchemaCapabilityModel) => new MapValueCapabilityModel<ObjectSchemaCapabilityModel>(dtmi, model);
  }

  public static mapValueFormFactory(): (model: MapValueCapabilityModel<ObjectSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => MapValueFormControl {
    return (model: MapValueCapabilityModel<ObjectSchemaCapabilityModel>, fb: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => new MapValueFormControl(model, fb, validationService, schemaService, dialog);
  }
}