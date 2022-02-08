import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class BooleanSchemaCapbilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Boolean");
    }    
}