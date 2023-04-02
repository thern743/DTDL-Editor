import { AnyT, jsonMember, jsonObject } from "typedjson";
import { CustomDeserializerParams } from "typedjson/lib/types/metadata";
import { ISchemaModel } from "./interfaces/ISchemaModel";
import { LanguageMap } from "./LanguageMap";

@jsonObject
export abstract class AbstractSchemaModel implements ISchemaModel {
    @jsonMember({ name: '@id' })
    public id!: string;

    @jsonMember({ name: '@type'})
    public type!: string;

    @jsonMember(AnyT)
    public displayName!: string | Array<LanguageMap>;

    @jsonMember(AnyT)
    public description!: string | Array<LanguageMap>;

    @jsonMember
    public comment!: string;

    constructor(id: string, type: string) {
        this.id = id;
        this.type = type;
    }
}