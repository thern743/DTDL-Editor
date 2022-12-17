import { ComponentType } from "@angular/cdk/portal";
import { jsonObject } from "typedjson";
import { PrimitiveSchemaComponent } from "../primitive-schema/primitive-schema.component";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class PrimitiveSchemaCapabilityModel extends AbstractCapabilityModel {
    public schema: string;

    constructor(id: string, schema: string = "Generic") {
        super(id, schema);
        this.schema = schema;
    }
    
    public resolveSchemaComponentType(): ComponentType<any> {
      return PrimitiveSchemaComponent;
    }
}