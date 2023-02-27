import { ComponentType } from "@angular/cdk/portal";
import { jsonObject } from "typedjson";
import { PrimitiveSchemaComponent } from "../../primitive-schema/primitive-schema.component";
import { AbstractSchemaModel } from "../AbstractSchemaModel";

@jsonObject
export class DoubleSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "Double");
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return PrimitiveSchemaComponent;
  }
}