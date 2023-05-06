import { ISchemaModel } from "./interfaces/ISchemaModel";
import { LanguageMap } from "./LanguageMap";

export abstract class AbstractSchemaModel implements ISchemaModel {
    public "@id"!: string;

    public "@type"!: string;

    public displayName!: string | Array<LanguageMap>;

    public description!: string | Array<LanguageMap>;

    public comment!: string;

    constructor(id: string, type: string) {
        this["@id"] = id;
        this["@type"] = type;
    }
}