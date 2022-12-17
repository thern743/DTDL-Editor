import { ComponentType } from "@angular/cdk/portal";
import { jsonObject } from "typedjson";
import { PrimitiveSchemaComponent } from "../primitive-schema/primitive-schema.component";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class IntegerSchemaCapabilityModel extends AbstractCapabilityModel {
    constructor(id: string) {
        super(id, "Integer");
    }    

    public resolveSchemaComponentType(): ComponentType<any> {
      return PrimitiveSchemaComponent;
    }
}