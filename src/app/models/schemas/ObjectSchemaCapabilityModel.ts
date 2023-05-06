
import { FieldCapabilityModel } from "../FieldCapabilityModel";
import { AbstractSchemaModel } from '../AbstractSchemaModel';

export class ObjectSchemaCapabilityModel extends AbstractSchemaModel {
  public fields!: Array<FieldCapabilityModel>;

  constructor(id: string) {
    super(id, "Object");
    this.fields = new Array<FieldCapabilityModel>();
  }
}