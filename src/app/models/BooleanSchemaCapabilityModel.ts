import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class BooleanSchemaCapabilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Boolean");
    }    
}