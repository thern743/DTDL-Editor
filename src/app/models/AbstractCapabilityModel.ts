import { ComponentType } from "@angular/cdk/portal";
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { CustomDeserializerParams } from "typedjson/lib/types/metadata";
import { ICapabilityModel } from "./ICapabilityModel";

@jsonObject
export abstract class AbstractCapabilityModel implements ICapabilityModel {
    @jsonMember({ name: '@id' })
    public id!: string;

    @jsonMember(AnyT, { name: '@type', deserializer: AbstractCapabilityModel.typeDeserializer })
    public type!: string | Array<string>;

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

    public abstract resolveSchemaComponentType(): ComponentType<any>;

    public static typeDeserializer(json: Array<string> | string, params: CustomDeserializerParams) {
      if (typeof json === 'string')
        return new Array<string>(json);
      else if (json instanceof Array)
        return new Array<string>(...json)
      else
        return params.fallback(json, Object)
    }
}