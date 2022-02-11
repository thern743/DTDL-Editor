import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class DoubleSchemaCapabilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Double");
    }    
}