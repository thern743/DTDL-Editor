import { ComponentType } from "@angular/cdk/portal";
import { jsonMember, jsonObject } from "typedjson";
import { CustomDeserializerParams } from "typedjson/lib/types/metadata";
import { ISchemaModel } from "./interfaces/ISchemaModel";

@jsonObject
export abstract class AbstractSchemaModel implements ISchemaModel {
    @jsonMember({ name: '@id' })
    public id!: string;

    @jsonMember({ name: '@type'})
    public type!: string;

    @jsonMember
    public displayName!: string;

    @jsonMember
    public description!: string;

    @jsonMember
    public comment!: string;

    constructor(id: string, type: string) {
        this.id = id;
        this.type = type;
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