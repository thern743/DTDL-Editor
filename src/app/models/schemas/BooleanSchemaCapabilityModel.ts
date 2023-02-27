import { ComponentType } from "@angular/cdk/portal";
import { PrimitiveSchemaComponent } from "../../primitive-schema/primitive-schema.component";
import { jsonObject } from "typedjson";
import { AbstractSchemaModel } from "../AbstractSchemaModel";

@jsonObject
export class BooleanSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "Boolean");
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return PrimitiveSchemaComponent;
  }
}