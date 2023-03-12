import 'reflect-metadata';
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
import { AbstractSchemaModel } from './AbstractSchemaModel';
import { CustomDeserializerParams } from 'typedjson/lib/types/metadata';
import { ArraySchemaCapabilityModel } from './schemas/ArraySchemaCapabilityModel';
import { EnumSchemaCapabilityModel } from './schemas/EnumSchemaCapabilityModel';
import { MapSchemaCapabilityModel } from './schemas/MapSchemaCapabilityModel';
import { ObjectSchemaCapabilityModel } from './schemas/ObjectSchemaCapabilityModel';

@jsonObject
export class FieldCapabilityModel extends AbstractCapabilityModel {
  @jsonMember
  public name!: string;

  @jsonMember(AnyT, { deserializer: FieldCapabilityModel.schemaDeserializer })
  public schema!: string | AbstractSchemaModel;

  constructor(id: string) {
    super(id, "Field");
  }

  // Must exist on the class being deserialized.
  public static schemaDeserializer(value: string | AbstractSchemaModel, params: CustomDeserializerParams) {
    if (!value) return;
    let schema = typeof value === 'string' ? value : value.type;

    switch (schema?.toLocaleLowerCase()) {
      case "array":
        //return params.fallback(value, ArraySchemaCapabilityModel);
      case "map":
        //return params.fallback(value, MapSchemaCapabilityModel);
      case "enum":
        //return params.fallback(value, EnumSchemaCapabilityModel);
      // TODO: Circular dependency between ObjectSchemaCapabilityModel and FieldCapabilityModel causes webpack error
      //       Error: Cannot access 'FieldCapabilityModel' before initialization
      case "object":
        //return params.fallback(value, ObjectSchemaCapabilityModel);
      default:
        return value;
    }
  }
}