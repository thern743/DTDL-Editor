import { AbstractSchemaModel } from "../AbstractSchemaModel";

export class TimeSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "Time");
    this["@id"] = id;
  }
}