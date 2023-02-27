import { jsonObject } from "typedjson";
import { AbstractSchemaModel } from "../AbstractSchemaModel";

@jsonObject
export class DateTimeSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "DateTime");
  }
}