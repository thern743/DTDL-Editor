import { jsonArrayMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
import { FieldCapabilityModel } from "./FieldCapabilityModel";

@jsonObject
export class ObjectSchemaCapbilityModel extends AbstractCapabilityModel {
    @jsonArrayMember(FieldCapabilityModel)
    public fields!: FieldCapabilityModel[];

    constructor(id: string) {
        super(id, "Object");
        this.fields = new Array<FieldCapabilityModel>();
    }    
}