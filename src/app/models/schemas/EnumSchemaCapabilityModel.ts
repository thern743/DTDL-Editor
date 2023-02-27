import { ComponentType } from "@angular/cdk/portal";
import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { EnumSchemaComponent } from "../../enum-schema/enum-schema.component";
import { AbstractSchemaModel } from "../AbstractSchemaModel";
import { EnumValueCapabilityModel } from "../EnumValueCapabilityModel";

@jsonObject
export class EnumSchemaCapabilityModel extends AbstractSchemaModel {
  @jsonMember
  public valueSchema!: number | string;

  @jsonArrayMember(EnumValueCapabilityModel)
  public enumValues!: Array<EnumValueCapabilityModel>;

  constructor(id: string) {
    super(id, "Enum");
    this.enumValues = new Array<EnumValueCapabilityModel>();
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return EnumSchemaComponent;
  }
}