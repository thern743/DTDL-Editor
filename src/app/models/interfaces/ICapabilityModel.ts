import { LanguageMap } from "../LanguageMap";

export interface ICapabilityModel {
    "@id": string;
    "@type": string | Array<string>;
    displayName: string | Array<LanguageMap>;
    description: string | Array<LanguageMap>;
    comment: string;
}