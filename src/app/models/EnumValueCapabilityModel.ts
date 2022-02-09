import { jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
// TODO: Remove rendering of Type for EnumValue
@jsonObject
export class EnumValueCapabilityModel extends AbstractCapabilityModel {
    @jsonMember
    public name!: string;
    
    @jsonMember
    public enumValue!: number | string;

    constructor(id: string) {
        super(id, "EnumValue");
    }
}