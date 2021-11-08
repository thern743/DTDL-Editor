import { jsonMember, jsonObject } from "typedjson";
import { ICapabilityModel } from "./ICapabilityModel";

@jsonObject
export class AbstractCapabilityModel implements ICapabilityModel {
    @jsonMember({ name: '@id' })
    public id!: string;

    @jsonMember({ name: '@type' })
    public type!: string;

    @jsonMember
    public displayName!: string;

    @jsonMember
    public description!: string;

    @jsonMember
    public comment!: string;

    constructor(displayName: string) {
        this.displayName = displayName;
    }
}
