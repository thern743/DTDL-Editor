import 'reflect-metadata';
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
import { AbstractSchemaModel } from './AbstractSchemaModel';
import { CustomDeserializerParams } from 'typedjson/lib/types/metadata';
import { ArraySchemaCapabilityModel } from './schemas/ArraySchemaCapabilityModel';
import { EnumSchemaCapabilityModel } from './schemas/EnumSchemaCapabilityModel';
import { MapSchemaCapabilityModel } from './schemas/MapSchemaCapabilityModel';
import { ObjectSchemaCapabilityModel } from './schemas/ObjectSchemaCapabilityModel';
import { PrimitiveSchemaCapabilityModel } from './schemas/PrimitiveSchemaCapabilityModel';

@jsonObject
export class FieldCapabilityModel extends AbstractSchemaModel {
  @jsonMember
  public name!: string;

  @jsonMember(AnyT, { deserializer: FieldCapabilityModel.schemaDeserializer })
  public schema!: string | AbstractSchemaModel;

  constructor(id: string) {
    super(id, "Field");
  }

  // Must exist on the class being deserialized.
  public static schemaDeserializer(value: string | any, params: CustomDeserializerParams) {
    if (!value) return;
    
    if (typeof value === 'string')
      return value;

    if (!value["@type"]) return;

    switch (value["@type"]?.toLocaleLowerCase()) {
      case "array":
        return params.fallback(value, ArraySchemaCapabilityModel);
      case "map":
        return params.fallback(value, MapSchemaCapabilityModel);
      case "enum":
        return params.fallback(value, EnumSchemaCapabilityModel);
      // TODO: Circular dependency between ObjectSchemaCapabilityModel and FieldCapabilityModel causes webpack error
      //       Error: Cannot access 'FieldCapabilityModel' before initialization
      case "object":
        return params.fallback(value, ObjectSchemaCapabilityModel);
      default:
        return value;
    }
  }
}