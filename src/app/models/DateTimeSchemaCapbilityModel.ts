import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class DateTimeSchemaCapbilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "DateTime");
    }    
}