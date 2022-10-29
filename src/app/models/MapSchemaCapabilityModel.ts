import { jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
import { MapKeyCapabilityModel } from "./MapKeyCapabilityModel";
import { MapValueCapabilityModel } from "./MapValueCapabilityModel";

@jsonObject
export class MapSchemaCapabilityModel<TKeyModel extends AbstractCapabilityModel, TValueModel extends AbstractCapabilityModel> extends AbstractCapabilityModel {
    @jsonMember
    public mapKey!: MapKeyCapabilityModel<TKeyModel>;

    @jsonMember
    public mapValue!: MapValueCapabilityModel<TValueModel>;

    constructor(id: string, keyModel: TKeyModel, valueModel: TValueModel) {
        super(id, "Map");
        this.mapKey = new MapKeyCapabilityModel<TKeyModel>("dtmi:com:example:MyMapKey;1", keyModel);
        this.mapValue = new MapValueCapabilityModel<TValueModel>("dtmi:com:example:MyMapValue;1", valueModel); 
    }    
}