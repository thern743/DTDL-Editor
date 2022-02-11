import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class GenericSchemaCapbilityModel extends AbstractCapabilityModel {
    public schema: string = "Generic";

    constructor(id: string) {
        super(id, "Generic");
    }    
}