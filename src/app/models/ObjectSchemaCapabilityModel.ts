import { ComponentType } from "@angular/cdk/portal";
import { jsonArrayMember, jsonObject } from "typedjson";
import { ObjectSchemaComponent } from "../object-schema/object-schema.component";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
import { FieldCapabilityModel } from "./FieldCapabilityModel";

@jsonObject
export class ObjectSchemaCapabilityModel extends AbstractCapabilityModel {
    @jsonArrayMember(FieldCapabilityModel)
    public fields!: FieldCapabilityModel[];

    constructor(id: string) {
        super(id, "Object");
        this.fields = new Array<FieldCapabilityModel>();
    }    

    public resolveSchemaComponentType(): ComponentType<any> {
      return ObjectSchemaComponent;
    }
}