import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class FloatSchemaCapbilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Float");
    }    
}