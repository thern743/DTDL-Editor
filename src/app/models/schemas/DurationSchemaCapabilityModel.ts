import { jsonObject } from "typedjson";
import { AbstractSchemaModel } from "../AbstractSchemaModel";

@jsonObject
export class DurationSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "Duration");
  }
}