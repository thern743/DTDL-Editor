
import { ICapabilityModel } from "./interfaces/ICapabilityModel";
import { LanguageMap } from './LanguageMap';

export abstract class AbstractCapabilityModel implements ICapabilityModel {
    public "@id"!: string;

    public "@type"!: string | Array<string>;

    public displayName!: string | Array<LanguageMap>;

    public description!: string | Array<LanguageMap>;

    public comment!: string;

    constructor(id: string, type: string | Array<string>) {
        this["@id"] = id;
        this["@type"] = type;
    }
}