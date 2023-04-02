import { AbstractSchemaModel } from "../AbstractSchemaModel";
import { EnumValueCapabilityModel } from "../EnumValueCapabilityModel";

export class EnumSchemaCapabilityModel extends AbstractSchemaModel {
  public valueSchema!: string;

  public enumValues!: Array<EnumValueCapabilityModel>;

  constructor(id: string) {
    super(id, "Enum");
    this.enumValues = new Array<EnumValueCapabilityModel>();
  }
}