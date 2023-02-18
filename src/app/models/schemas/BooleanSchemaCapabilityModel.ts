import { ComponentType } from "@angular/cdk/portal";
import { PrimitiveSchemaComponent } from "../../primitive-schema/primitive-schema.component";
import { RegisterModelFactoryMethod } from "../../reflection/ReflectionMetadata";
import { jsonObject } from "typedjson";
import { AbstractSchemaModel } from "../AbstractSchemaModel";
import { MapValueCapabilityModel } from "../MapValueCapabilityModel";

@jsonObject
export class BooleanSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "Boolean");
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return PrimitiveSchemaComponent;
  }
}