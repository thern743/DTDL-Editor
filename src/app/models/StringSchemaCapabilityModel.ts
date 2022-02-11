import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class StringSchemaCapabilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "String");
        this.id = id;
    }    
}