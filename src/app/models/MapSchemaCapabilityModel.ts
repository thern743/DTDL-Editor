import 'reflect-metadata';
import { ComponentType } from "@angular/cdk/portal";
import { jsonMember, jsonObject } from "typedjson";
import { MapSchemaComponent } from "../map-schema/map-schema.component";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
import { MapKeyCapabilityModel } from "./MapKeyCapabilityModel";
import { MapValueCapabilityModel } from "./MapValueCapabilityModel";

@jsonObject
export class MapSchemaCapabilityModel<TKeyModel extends AbstractCapabilityModel, TValueModel extends AbstractCapabilityModel> extends AbstractCapabilityModel {
  @jsonMember
  public mapKey!: MapKeyCapabilityModel<TKeyModel>;

  @jsonMember
  public mapValue!: MapValueCapabilityModel<TValueModel>;

  constructor(id: string) {
    super(id, "Map");
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return MapSchemaComponent;
  }

  public setKey(keyModel: TKeyModel): void {
    this.mapKey = new MapKeyCapabilityModel<TKeyModel>("dtmi:com:example:MyMapKey;1", keyModel);
  }

  public setValue(valueModel: TValueModel): void {
    this.mapValue = new MapValueCapabilityModel<TValueModel>("dtmi:com:example:MyMapValue;1", valueModel);
  }
}