import { jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
import { MapKeyCapabilityModel } from "./MapKeyCapabilityModel";
import { MapValueCapabilityModel } from "./MapValueCapabilityModel";

@jsonObject
export class MapSchemaCapabilityModel extends AbstractCapabilityModel {
    @jsonMember
    public mapKey!: MapKeyCapabilityModel;

    @jsonMember
    public mapValue!: MapValueCapabilityModel;

    constructor(id: string) {
        super(id, "Map");
        this.mapKey = new MapKeyCapabilityModel("dtmi:com:example:MyMapKey;1");
        this.mapValue = new MapValueCapabilityModel("dtmi:com:example:MyMapValue;1"); 
    }    
}