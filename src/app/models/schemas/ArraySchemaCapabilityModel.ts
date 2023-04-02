
import { AbstractSchemaModel } from '../AbstractSchemaModel';

export class ArraySchemaCapabilityModel extends AbstractSchemaModel {
  public elementSchema!: string | AbstractSchemaModel;

  constructor(id: string) {
    super(id, "Array");
  }
}