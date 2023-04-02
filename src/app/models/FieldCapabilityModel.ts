
import { AbstractSchemaModel } from './AbstractSchemaModel';

export class FieldCapabilityModel extends AbstractSchemaModel {
  public name!: string;

  public schema!: string | AbstractSchemaModel;

  constructor(id: string) {
    super(id, "Field");
  }
}