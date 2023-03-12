import { jsonObject } from "typedjson";
import { AbstractSchemaModel } from "../AbstractSchemaModel";

@jsonObject
export class IntegerSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "Integer");
  }
}