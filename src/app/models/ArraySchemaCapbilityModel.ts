import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class ArraySchemaCapbilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Array");
        this.id = id;
    }    
}