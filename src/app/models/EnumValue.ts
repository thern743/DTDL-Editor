import { jsonMember } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

export class EnumValue extends AbstractCapabilityModel {
    @jsonMember
    public name!: string;
    
    @jsonMember
    public enumValue!: number | string;

    constructor(id: string) {
        super(id, "EnumValue");
    }
}