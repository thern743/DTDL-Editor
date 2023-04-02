
import { AbstractSchemaModel } from "../AbstractSchemaModel";

export class PrimitiveSchemaCapabilityModel extends AbstractSchemaModel {
  public schema!: string;

  constructor(id: string) {
    super(id, "primitive");
  }
}