import 'reflect-metadata';
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { CustomDeserializerParams } from "typedjson/lib/types/metadata";
import { ICapabilityModel } from "./interfaces/ICapabilityModel";
import { LanguageMap } from './LanguageMap';

@jsonObject
export abstract class AbstractCapabilityModel implements ICapabilityModel {
    @jsonMember({ name: '@id' })
    public id!: string;

    @jsonMember(AnyT, { name: '@type', deserializer: AbstractCapabilityModel.arrayOrStringDeserializer })
    public type!: string | Array<string>;

    @jsonMember(AnyT)
    public displayName!: string | Array<LanguageMap>;

    @jsonMember(AnyT)
    public description!: string | Array<LanguageMap>;

    @jsonMember
    public comment!: string;

    constructor(id: string, type: string | Array<string>) {
        this.id = id;
        this.type = type;
    }

    public static arrayOrStringDeserializer(json: Array<string> | string, params: CustomDeserializerParams) {
      if (typeof json === 'string')
        return new Array<string>(json);
      else if (json instanceof Array)
        return new Array<string>(...json)
      else
        return params.fallback(json, Object)
    }
}