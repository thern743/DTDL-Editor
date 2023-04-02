import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { AbstractSchemaModel } from "../AbstractSchemaModel";
import { EnumValueCapabilityModel } from "../EnumValueCapabilityModel";

@jsonObject
export class EnumSchemaCapabilityModel extends AbstractSchemaModel {
  @jsonMember
  public valueSchema!: string;

  @jsonArrayMember(EnumValueCapabilityModel)
  public enumValues!: Array<EnumValueCapabilityModel>;

  constructor(id: string) {
    super(id, "Enum");
    this.enumValues = new Array<EnumValueCapabilityModel>();
  }
}