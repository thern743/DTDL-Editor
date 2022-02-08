import { jsonMember } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

export class MapValue extends AbstractCapabilityModel {
    @jsonMember
    public name!: string;

    @jsonMember
    public schema!: AbstractCapabilityModel;

    constructor(id: string) {
        super(id, "MapValue");
    }
}