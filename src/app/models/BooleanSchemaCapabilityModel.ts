import 'reflect-metadata';
import { ComponentType } from "@angular/cdk/portal";
import { jsonObject } from "typedjson";
import { PrimitiveSchemaComponent } from "../primitive-schema/primitive-schema.component";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class BooleanSchemaCapabilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Boolean");
    }
    
    public resolveSchemaComponentType(): ComponentType<any> {
      return PrimitiveSchemaComponent;
    }
}