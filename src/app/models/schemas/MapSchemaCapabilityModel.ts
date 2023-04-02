import 'reflect-metadata';
import { jsonMember, jsonObject } from "typedjson";
import { MapKeyCapabilityModel } from "../MapKeyCapabilityModel";
import { MapValueCapabilityModel } from "../MapValueCapabilityModel";
import { AbstractSchemaModel } from '../AbstractSchemaModel';
import { CustomDeserializerParams } from 'typedjson/lib/types/metadata';
import { ArraySchemaCapabilityModel } from './ArraySchemaCapabilityModel';
import { EnumSchemaCapabilityModel } from './EnumSchemaCapabilityModel';
import { ObjectSchemaCapabilityModel } from './ObjectSchemaCapabilityModel';
import { PrimitiveSchemaCapabilityModel } from './PrimitiveSchemaCapabilityModel';

@jsonObject
export class MapSchemaCapabilityModel<TKeyModel extends AbstractSchemaModel, TValueModel extends AbstractSchemaModel> extends AbstractSchemaModel {
  @jsonMember(AbstractSchemaModel, { deserializer: MapSchemaCapabilityModel.schemaDeserializer })
  public mapKey!: MapKeyCapabilityModel<TKeyModel>;

  @jsonMember(AbstractSchemaModel, { deserializer: MapSchemaCapabilityModel.schemaDeserializer })
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

  public static mapKeyDeserializer(value: any, params: CustomDeserializerParams) {
    return params.fallback(value, MapKeyCapabilityModel);
    
    // if (typeof value === 'string')
    // return params.fallback(value, MapKeyCapabilityModel);

    // if (!value["@type"]) return;

    // switch (value["@type"]?.toLocaleLowerCase()) {
    //   case "array":
    //     return params.fallback(value, MapKeyCapabilityModel);
    //   case "map":
    //     return params.fallback(value, MapSchemaCapabilityModel);
    //   case "enum":
    //     return params.fallback(value, MapKeyCapabilityModel);
    //   case "object":
    //     return params.fallback(value, MapKeyCapabilityModel);
    //   default:
    //     return params.fallback(value, MapKeyCapabilityModel);
    // }
  }

  public static mapValueDeserializer(value: any, params: CustomDeserializerParams) {
    return params.fallback(value, MapValueCapabilityModel);
    // if (typeof value === 'string')
    //   return params.fallback(value, MapValueCapabilityModel);

    // if (!value["@type"]) return;

    // switch (value["@type"]?.toLocaleLowerCase()) {
    //   case "array":
    //     return params.fallback(value, MapValueCapabilityModel);
    //   case "map":
    //     return params.fallback(value, MapSchemaCapabilityModel);
    //   case "enum":
    //     return params.fallback(value, MapValueCapabilityModel);
    //   case "object":
    //     return params.fallback(value, MapValueCapabilityModel);
    //   default:
    //     return params.fallback(value, MapValueCapabilityModel);
    // }
  }

  public static schemaDeserializer(value: string | any, params: CustomDeserializerParams) {
    if (!value) return;
    
    if (typeof value === 'string')
      return params.fallback(value, String);

    if (!value["@type"]) return;

    switch (value["@type"]?.toLocaleLowerCase()) {
      case "array":
        return params.fallback(value, ArraySchemaCapabilityModel);
      case "map":
        return params.fallback(value, MapSchemaCapabilityModel);
      case "enum":
        return params.fallback(value, EnumSchemaCapabilityModel);
      case "object":
        return params.fallback(value, ObjectSchemaCapabilityModel);
      default:
        return params.fallback(value, PrimitiveSchemaCapabilityModel);
    }
  }
}