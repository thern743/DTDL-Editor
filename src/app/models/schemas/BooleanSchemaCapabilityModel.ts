import { AbstractSchemaModel } from "../AbstractSchemaModel";

export class BooleanSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "Boolean");
  }
}