import { jsonObject } from "typedjson";
import { AbstractSchemaModel } from "../AbstractSchemaModel";

@jsonObject
export class PrimitiveSchemaCapabilityModel extends AbstractSchemaModel {
  public schema: string;

  constructor(id: string, schema: string = "Generic") {
    super(id, schema);
    this.schema = schema;
  }
}