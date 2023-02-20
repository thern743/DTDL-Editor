import { ComponentType } from "@angular/cdk/portal";
import { RegisterModelFactoryMethod } from "../../reflection/ReflectionMetadata";
import { jsonObject } from "typedjson";
import { PrimitiveSchemaComponent } from "../../primitive-schema/primitive-schema.component";
import { AbstractSchemaModel } from "../AbstractSchemaModel";
import { MapValueCapabilityModel } from "../MapValueCapabilityModel";

@jsonObject
export class IntegerSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "Integer");
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return PrimitiveSchemaComponent;
  }
}