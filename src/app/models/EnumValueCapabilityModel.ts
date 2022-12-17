import { ComponentType } from "@angular/cdk/portal";
import { jsonMember, jsonObject } from "typedjson";
import { EnumValueComponent } from "../enum-schema/enum-value/enum-value.component";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

// TODO: Remove rendering of Type for EnumValue
@jsonObject
export class EnumValueCapabilityModel extends AbstractCapabilityModel {
    @jsonMember
    public name!: string;
    
    @jsonMember
    public enumValue!: number | string;

    constructor(id: string) {
        super(id, "EnumValue");
    }

    public resolveSchemaComponentType(): ComponentType<any> {
      return EnumValueComponent;
    }
}