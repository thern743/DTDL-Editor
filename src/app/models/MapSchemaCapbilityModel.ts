import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class MapSchemaCapbilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Map");
        this.id = id;
    }    
}