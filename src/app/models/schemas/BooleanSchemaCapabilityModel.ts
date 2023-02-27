import { jsonObject } from "typedjson";
import { AbstractSchemaModel } from "../AbstractSchemaModel";

@jsonObject
export class BooleanSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "Boolean");
  }
}