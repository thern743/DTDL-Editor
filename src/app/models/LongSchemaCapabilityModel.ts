import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class LongSchemaCapabilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Long");
    }    
}