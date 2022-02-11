import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
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
}