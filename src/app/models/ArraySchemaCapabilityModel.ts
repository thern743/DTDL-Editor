import 'reflect-metadata';
import { ComponentType } from "@angular/cdk/portal";
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { ArraySchemaComponent } from "../array-schema/array-schema.component";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class ArraySchemaCapabilityModel extends AbstractCapabilityModel {
    @jsonMember(AnyT)
    public elementSchema!: string | AbstractCapabilityModel;

    constructor(id: string) {
        super(id, "Array");
    }    

    public resolveSchemaComponentType(): ComponentType<any> {
      return ArraySchemaComponent;
    }
}