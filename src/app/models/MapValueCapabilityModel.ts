import 'reflect-metadata';
import { AnyT, jsonMember } from "typedjson";
import { CustomDeserializerParams } from 'typedjson/lib/types/metadata';
import { AbstractSchemaModel } from './AbstractSchemaModel';
import { ArraySchemaCapabilityModel } from './schemas/ArraySchemaCapabilityModel';
import { EnumSchemaCapabilityModel } from './schemas/EnumSchemaCapabilityModel';
import { MapSchemaCapabilityModel } from './schemas/MapSchemaCapabilityModel';
import { ObjectSchemaCapabilityModel } from './schemas/ObjectSchemaCapabilityModel';

export class MapValueCapabilityModel<TCapabilityModel extends AbstractSchemaModel> extends AbstractSchemaModel {
  @jsonMember
  public name!: string;

  @jsonMember(AnyT, { deserializer: MapValueCapabilityModel.schemaDeserializer })
  public schema!: string | AbstractSchemaModel;

  constructor(id: string, schemaModel: TCapabilityModel) {
    // TODO: Remove use of hard-coded index for determining model type (MapValueCapabilityModel)
    //       Currently the super() call on MapValueCapabilityModel is passing `ICapabilityModel.type[0]`.
    //       This is not stable pattern and should be revamped to something more proper.
    super(id, schemaModel.type[0]);
    this.schema = schemaModel;
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
        return value;
    }
  }
}