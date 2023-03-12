import { jsonObject } from "typedjson";
import { AbstractSchemaModel } from "../AbstractSchemaModel";

@jsonObject
export class StringSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "String");
    this.id = id;
  }
}