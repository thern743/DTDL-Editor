import { ComponentType } from "@angular/cdk/portal";
import { jsonObject } from "typedjson";
import { PrimitiveSchemaComponent } from "../../primitive-schema/primitive-schema.component";
import { AbstractSchemaModel } from "../AbstractSchemaModel";

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