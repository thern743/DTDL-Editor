import { jsonMember } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
// TODO: Remove rendering of Type for EnumValue
export class MapKey extends AbstractCapabilityModel {
    @jsonMember
    public name!: string;

    @jsonMember
    public schema: string = "string";

    constructor(id: string) {
        super(id, "MapKey");
    }
}