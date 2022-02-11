import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class DateTimeSchemaCapabilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "DateTime");
    }    
}