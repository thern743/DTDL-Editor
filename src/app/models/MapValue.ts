import { jsonMember } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
// TODO: Remove rendering of Type for EnumValue
export class MapValue extends AbstractCapabilityModel {
    @jsonMember
    public name!: string;

    @jsonMember
    public schema!: AbstractCapabilityModel;

    constructor(id: string) {
        super(id, "MapValue");
    }
}