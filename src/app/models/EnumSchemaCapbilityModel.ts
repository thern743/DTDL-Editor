import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
import { EnumValue } from "./EnumValue";

@jsonObject
export class EnumSchemaCapbilityModel extends AbstractCapabilityModel {
    @jsonArrayMember(EnumValue)
    public enumValues!: Array<EnumValue>;

    @jsonMember
    public valueSchema!: number | string;

    constructor(id: string) {
        super(id, "Enum");
        this.id = id;
    }    
}