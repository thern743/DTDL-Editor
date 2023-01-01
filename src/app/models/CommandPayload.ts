import 'reflect-metadata';
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { CustomDeserializerParams } from 'typedjson/lib/types/metadata';
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
import { ArraySchemaCapabilityModel } from './ArraySchemaCapabilityModel';
import { EnumSchemaCapabilityModel } from './EnumSchemaCapabilityModel';
import { MapSchemaCapabilityModel } from './MapSchemaCapabilityModel';
import { ObjectSchemaCapabilityModel } from './ObjectSchemaCapabilityModel';

@jsonObject
export class CommandPayload {
  @jsonMember({ name: '@id' })
  public id!: string;

  @jsonMember
  public name!: string;

  @jsonMember(AnyT, { deserializer: CommandPayload.schemaDeserializer })
  public schema!: string | AbstractCapabilityModel;

  @jsonMember
  public displayName!: string;

  @jsonMember
  public description!: string;

  @jsonMember
  public comment!: string;

  public static schemaDeserializer(value: string | AbstractCapabilityModel, params: CustomDeserializerParams) {
    let schema = "";

    if (typeof value === 'string') {
      schema = value;
    } else if (value instanceof Object) {
      if (value?.type instanceof Array) {
        schema = value.type[0];
      } else {
        schema = value.type;
      }
    }

    switch (schema) {
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