import { ComponentType } from "@angular/cdk/portal";
import { jsonObject } from "typedjson";
import { PrimitiveSchemaComponent } from "../primitive-schema/primitive-schema.component";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class StringSchemaCapabilityModel extends AbstractCapabilityModel{
    constructor(id: string) {
        super(id, "String");
        this.id = id;
    }    

    public override resolveSchemaComponentType(): ComponentType<any> {
      return PrimitiveSchemaComponent;
    }
}