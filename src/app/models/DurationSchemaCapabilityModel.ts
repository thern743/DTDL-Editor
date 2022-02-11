import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class DurationSchemaCapabilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Duration");
    }    
}