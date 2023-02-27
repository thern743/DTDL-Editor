import { Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapValueFormControl } from "../formControls/MapValueFormControl";
import { ArraySchemaFormControl } from "../formControls/schemas/ArraySchemaFormControl";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { ArraySchemaCapabilityModel } from "../models/schemas/ArraySchemaCapabilityModel";
import { RegisterFormFactoryMethod, RegisterModelFactoryMethod } from "../reflection/ReflectionMetadata";
import { ValidationService } from "../services/validation/validation-service.service";

@RegisterModelFactoryMethod({
  type: "Complex",
  name: "array",
  factoryMethod: "modelFactory"
})
@RegisterModelFactoryMethod({
  type: "MapValue",
  name: "array",
  factoryMethod: "mapValueModelFactory"
})
@RegisterFormFactoryMethod({
  type: "Complex",
  name: "array",
  factoryMethod: "formFactory"
})
@RegisterFormFactoryMethod({
  type: "MapValue",
  name: "array",
  factoryMethod: "mapValueFormFactory"
})
@Injectable({
  providedIn: 'root'
})
export class ArraySchemaFactory {
  constructor() {
  }

  public static modelFactory(): (id: string) => ArraySchemaCapabilityModel {
    return (id: string) => new ArraySchemaCapabilityModel(id);
  }

  public static formFactory(): (model: ArraySchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) => ArraySchemaFormControl {
    return (model: ArraySchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) =>
      new ArraySchemaFormControl(model, validationService, formBuilder, dialog);
  }

  public static mapValueModelFactory(): (dtmi: string, model: ArraySchemaCapabilityModel) => MapValueCapabilityModel<ArraySchemaCapabilityModel> {
    return (dtmi: string, model: ArraySchemaCapabilityModel) => new MapValueCapabilityModel<ArraySchemaCapabilityModel>(dtmi, model);
  }

  public static mapValueFormFactory(): (model: MapValueCapabilityModel<ArraySchemaCapabilityModel>, fb: FormBuilder, validationService: ValidationService, dialog: MatDialog) => MapValueFormControl {
    return (model: MapValueCapabilityModel<ArraySchemaCapabilityModel>, fb: FormBuilder, validationService: ValidationService, dialog: MatDialog) => new MapValueFormControl(model, fb, validationService, dialog);
  }
}