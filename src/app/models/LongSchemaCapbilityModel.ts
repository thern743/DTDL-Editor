import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class LongSchemaCapbilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Long");
        this.id = id;
    }    
}