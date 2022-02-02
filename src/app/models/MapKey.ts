import { jsonMember } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

export class MapKey extends AbstractCapabilityModel {
    @jsonMember
    public name!: string;

    @jsonMember
    public schema: string = "String";
}