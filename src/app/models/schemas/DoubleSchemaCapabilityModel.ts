import { jsonObject } from "typedjson";
import { AbstractSchemaModel } from "../AbstractSchemaModel";

@jsonObject
export class DoubleSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "Double");
  }
}