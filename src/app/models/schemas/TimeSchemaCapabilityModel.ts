import { jsonObject } from "typedjson";
import { AbstractSchemaModel } from "../AbstractSchemaModel";

@jsonObject
export class TimeSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "Time");
    this.id = id;
  }
}