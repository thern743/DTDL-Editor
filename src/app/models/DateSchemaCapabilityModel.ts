import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class DateSchemaCapabilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Date");
    }    
}