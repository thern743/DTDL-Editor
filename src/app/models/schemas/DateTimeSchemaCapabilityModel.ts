import { AbstractSchemaModel } from "../AbstractSchemaModel";

export class DateTimeSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "DateTime");
  }
}