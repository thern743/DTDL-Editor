import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class IntegerSchemaCapbilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Integer");
        this.id = id;
    }    
}