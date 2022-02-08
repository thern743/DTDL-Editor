import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class DoubleSchemaCapbilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Double");
    }    
}