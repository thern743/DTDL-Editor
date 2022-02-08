import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class DurationSchemaCapbilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Duration");
    }    
}