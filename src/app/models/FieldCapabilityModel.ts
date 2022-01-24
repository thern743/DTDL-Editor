import { jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class FieldCapabilityModel extends AbstractCapabilityModel {    
    @jsonMember 
    public schema!: string;
    
    public level: number;

    constructor(id: string) {
        super(id, "Field");
        this.level = 0;
    }    
}