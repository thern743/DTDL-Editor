import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class ObjectSchemaCapbilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Object");
        this.id = id;
    }    
}