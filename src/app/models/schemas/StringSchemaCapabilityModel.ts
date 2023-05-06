import { AbstractSchemaModel } from "../AbstractSchemaModel";

export class StringSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "String");
    this["@id"] = id;
  }
}