import { jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
import { MapKey } from "./MapKey";
import { MapValue } from "./MapValue";

@jsonObject
export class MapSchemaCapbilityModel extends AbstractCapabilityModel {
    @jsonMember
    public mapKey!: MapKey;

    @jsonMember
    public mapValue!: MapValue;

    constructor(id: string) {
        super(id, "Map");
        this.mapKey = new MapKey("dtmi:com:example:MyMapKey;1");
        this.mapValue = new MapValue("dtmi:com:example:MyMapValue;1"); 
    }    
}