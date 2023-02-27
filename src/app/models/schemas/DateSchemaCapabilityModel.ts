import { jsonObject } from "typedjson";
import { AbstractSchemaModel } from "../AbstractSchemaModel";

@jsonObject
export class DateSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "Date");
  }
}