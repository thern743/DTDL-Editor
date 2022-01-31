import { jsonArrayMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
import { FieldCapabilityModel } from "./FieldCapabilityModel";

@jsonObject
export class ObjectSchemaCapbilityModel extends AbstractCapabilityModel {
    @jsonArrayMember(AbstractCapabilityModel)
    public fields!: FieldCapabilityModel[];

    constructor(id: string) {
        super(id, "Object");
        this.id = id;
        this.fields = new Array<FieldCapabilityModel>();
    }    
}