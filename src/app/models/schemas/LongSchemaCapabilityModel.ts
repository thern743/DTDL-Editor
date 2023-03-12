import { jsonObject } from "typedjson";
import { AbstractSchemaModel } from "../AbstractSchemaModel";

@jsonObject
export class LongSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "Long");
  }
}