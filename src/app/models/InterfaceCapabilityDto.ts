import 'reflect-metadata';
import { jsonMember, jsonObject, jsonSetMember } from "typedjson";
import { AbstractCapabilityDto } from './AbstractCapabilityDto';
import { ICapabilityDto } from "./ICapabilityDto";

@jsonObject
export class InterfaceCapabilityDto implements ICapabilityDto {
    @jsonMember id: string = "";
    @jsonMember type: string = "Interface";
    @jsonMember name: string = "";
    @jsonMember displayName: string = "";
    @jsonMember description: string = "";
    @jsonMember comment: string = "";
    // Interface specific
    @jsonMember context: string = "dtmi:dtdl:context;2";  
    @jsonMember extends: string = "";
    @jsonSetMember(AbstractCapabilityDto) contents: Set<ICapabilityDto>; //TODO: Figure out how to treat as Set

    constructor() {
        this.contents = new Set<ICapabilityDto>();
    }
}