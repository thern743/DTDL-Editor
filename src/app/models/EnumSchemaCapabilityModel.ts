import { ComponentType } from "@angular/cdk/portal";
import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { EnumSchemaComponent } from "../enum-schema/enum-schema.component";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
import { EnumValueCapabilityModel } from "./EnumValueCapabilityModel";

@jsonObject
export class EnumSchemaCapabilityModel extends AbstractCapabilityModel {
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