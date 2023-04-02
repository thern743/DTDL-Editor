import 'reflect-metadata';
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { AbstractSchemaModel } from '../AbstractSchemaModel';
import { CustomDeserializerParams } from 'typedjson/lib/types/metadata';
import { EnumSchemaCapabilityModel } from './EnumSchemaCapabilityModel';
import { MapSchemaCapabilityModel } from './MapSchemaCapabilityModel';
import { ObjectSchemaCapabilityModel } from './ObjectSchemaCapabilityModel';

@jsonObject
export class ArraySchemaCapabilityModel extends AbstractSchemaModel {
  @jsonMember(AnyT, { deserializer: ArraySchemaCapabilityModel.schemaDeserializer })
  public elementSchema!: string | AbstractSchemaModel;

  constructor(id: string) {
    super(id, "Array");
  }

  // Must exist on the class being deserialized.
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