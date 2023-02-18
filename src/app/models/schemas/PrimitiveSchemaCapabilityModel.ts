import { ComponentType } from "@angular/cdk/portal";
import { RegisterModelFactoryMethod } from "../../reflection/ReflectionMetadata";
import { jsonObject } from "typedjson";
import { PrimitiveSchemaComponent } from "../../primitive-schema/primitive-schema.component";
import { AbstractSchemaModel } from "../AbstractSchemaModel";
import { MapValueCapabilityModel } from "../MapValueCapabilityModel";

@jsonObject
export class PrimitiveSchemaCapabilityModel extends AbstractSchemaModel {
  public schema: string;

  constructor(id: string, schema: string = "Generic") {
    super(id, schema);
    this.schema = schema;
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return PrimitiveSchemaComponent;
  }
}