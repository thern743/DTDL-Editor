import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class TimeSchemaCapbilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Time");
        this.id = id;
    }    
}