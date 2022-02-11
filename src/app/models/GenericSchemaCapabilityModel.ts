import { jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class GenericSchemaCapabilityModel extends AbstractCapabilityModel {
    public schema: string;

    constructor(id: string, schema: string = "Generic") {
        super(id, schema);
        this.schema = schema;
    }    
}