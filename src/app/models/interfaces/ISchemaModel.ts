import { LanguageMap } from "../LanguageMap";

export interface ISchemaModel {
    "@id": string;
    "@type": string;
    displayName: string | Array<LanguageMap>;
    description: string | Array<LanguageMap>;
    comment: string;
}