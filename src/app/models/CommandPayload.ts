import 'reflect-metadata';
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { CustomDeserializerParams } from 'typedjson/lib/types/metadata';
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
import { AbstractSchemaModel } from './AbstractSchemaModel';
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
  public schema!: string | AbstractSchemaModel;

  @jsonMember
  public displayName!: string;

  @jsonMember
  public description!: string;

  @jsonMember
  public comment!: string;

  public static schemaDeserializer(value: string | AbstractSchemaModel, params: CustomDeserializerParams) {
    if (!value) return;
    let schema = typeof value === 'string' ? value : value.type;

    switch (schema?.toLocaleLowerCase()) {
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