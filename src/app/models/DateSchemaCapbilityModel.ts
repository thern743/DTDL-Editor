import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class DateSchemaCapbilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Date");
    }    
}