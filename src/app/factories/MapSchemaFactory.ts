import { UntypedFormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapValueFormControl } from "../formControls/MapValueFormControl";
import { MapSchemaFormControl } from "../formControls/schemas/MapSchemaFormControl";
import { AbstractSchemaModel } from "../models/AbstractSchemaModel";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { MapSchemaCapabilityModel } from "../models/schemas/MapSchemaCapabilityModel";
import { RegisterFormFactoryMethod, RegisterModelFactoryMethod } from "../reflection/ReflectionMetadata";
import { ValidationService } from "../services/validation/validation-service.service";
import { SchemaService } from "../services/schema/schema.service";

@RegisterModelFactoryMethod({
  type: "Complex",
  name: "map",
  factoryMethod: "modelFactory"
})
@RegisterFormFactoryMethod({
  type: "Complex",
  name: "map",
  factoryMethod: "formFactory"
})
@RegisterModelFactoryMethod({
  type: "MapValue",
  name: "map",
  factoryMethod: "mapValueModelFactory"
})
@RegisterFormFactoryMethod({
  type: "MapValue",
  name: "map",
  factoryMethod: "mapValueFormFactory"
})
export class MapSchemaFactory {
  constructor() {
  }

  public static modelFactory(): (id: string) => MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel> {
    return (id: string) => new MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>(id);
  }

  public static formFactory(): (model: MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) => MapSchemaFormControl {
    return (model: MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) =>
      new MapSchemaFormControl(model, validationService, formBuilder, dialog);
  }  

  public static mapValueModelFactory(): (dtmi: string, model: MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>) => MapValueCapabilityModel<MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>> {
    return (dtmi: string, model: MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>) => new MapValueCapabilityModel<MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>>(dtmi, model);
  }

  public static mapValueFormFactory(): (model: MapValueCapabilityModel<MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>>, formBuilder: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => MapValueFormControl {
    return (model: MapValueCapabilityModel<MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>>, formBuilder: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) => new MapValueFormControl(model, formBuilder, validationService, schemaService, dialog);
  }
}