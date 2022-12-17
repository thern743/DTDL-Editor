import { ComponentType } from "@angular/cdk/portal";
import { jsonMember, jsonObject } from "typedjson";
import { ArraySchemaComponent } from "../array-schema/array-schema.component";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class ArraySchemaCapabilityModel extends AbstractCapabilityModel {
    @jsonMember
    public elementSchema!: AbstractCapabilityModel;

    constructor(id: string) {
        super(id, "Array");
    }    

    public resolveSchemaComponentType(): ComponentType<any> {
      return ArraySchemaComponent;
    }
}