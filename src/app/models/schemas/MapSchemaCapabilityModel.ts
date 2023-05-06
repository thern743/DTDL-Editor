
import { MapKeyCapabilityModel } from "../MapKeyCapabilityModel";
import { MapValueCapabilityModel } from "../MapValueCapabilityModel";
import { AbstractSchemaModel } from '../AbstractSchemaModel';

export class MapSchemaCapabilityModel<TKeyModel extends AbstractSchemaModel, TValueModel extends AbstractSchemaModel> extends AbstractSchemaModel {
  public mapKey!: MapKeyCapabilityModel<TKeyModel>;

  public mapValue!: MapValueCapabilityModel<TValueModel>;

  constructor(id: string) {
    super(id, "Map");
  }

  public setKey(keyModel: TKeyModel): void {
    this.mapKey = new MapKeyCapabilityModel<TKeyModel>("dtmi:com:example:MyMapKey;1", keyModel);
  }

  public setValue(valueModel: TValueModel): void {
    this.mapValue = new MapValueCapabilityModel<TValueModel>("dtmi:com:example:MyMapValue;1", valueModel);
  }
}