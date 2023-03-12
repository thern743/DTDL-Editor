import { jsonObject } from "typedjson";
import { AbstractSchemaModel } from "../AbstractSchemaModel";

@jsonObject
export class FloatSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "Float");
  }
}