import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { ICapabilityModel } from "./ICapabilityModel";

@jsonObject
export class AbstractCapabilityModel implements ICapabilityModel {
    @jsonMember({ name: '@id' })
    public id!: string;

    @jsonArrayMember(String, { name: '@type' })
    public type!: Array<string>;

    @jsonMember
    public displayName!: string;

    @jsonMember
    public description!: string;

    @jsonMember
    public comment!: string;

    constructor(id: string, type: string) {
        this.id = id;
        this.type = new Array<string>(type);
    }
}
