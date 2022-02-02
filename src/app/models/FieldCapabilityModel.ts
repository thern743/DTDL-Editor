import { jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class FieldCapabilityModel extends AbstractCapabilityModel {    
    @jsonMember 
    public schema!: AbstractCapabilityModel;

    constructor(id: string) {
        super(id, "Field");
    }    
}