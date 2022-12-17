import { ComponentType } from "@angular/cdk/portal";
import { jsonMember, jsonObject } from "typedjson";
import { ICapabilityModel } from "./ICapabilityModel";
import { SemanticTypeArray } from "./SemanticTypeArray";

@jsonObject
export abstract class AbstractCapabilityModel implements ICapabilityModel {
    @jsonMember({ name: '@id' })
    public id!: string;

    @jsonMember({ name: '@type' })
    public type!: SemanticTypeArray;

    @jsonMember
    public displayName!: string;

    @jsonMember
    public description!: string;

    @jsonMember
    public comment!: string;

    constructor(id: string, type: string) {
        this.id = id;
        this.type = new SemanticTypeArray(type);
    }

    public abstract resolveSchemaComponentType(): ComponentType<any>;
}