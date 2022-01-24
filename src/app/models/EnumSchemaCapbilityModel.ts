import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class EnumSchemaCapbilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Enum");
        this.id = id;
    }    
}