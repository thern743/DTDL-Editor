import 'reflect-metadata';
import { ComponentType } from '@angular/cdk/portal';
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { CustomDeserializerParams } from 'typedjson/lib/types/metadata';
import { AbstractSchemaModel } from './AbstractSchemaModel';
import { CommandPayloadComponent } from '../command-payload/command-payload.component';
import { ArraySchemaCapabilityModel } from './ArraySchemaCapabilityModel';
import { MapSchemaCapabilityModel } from './MapSchemaCapabilityModel';
import { EnumSchemaCapabilityModel } from './EnumSchemaCapabilityModel';
import { ObjectSchemaCapabilityModel } from './ObjectSchemaCapabilityModel';
import { LanguageMap } from './LanguageMap';

@jsonObject
export class CommandPayload extends AbstractSchemaModel {
  @jsonMember({ name: '@id' })
  public id!: string;

  @jsonMember
  public name!: string;

  @jsonMember(AnyT, { deserializer: CommandPayload.schemaDeserializer })
  public schema!: string | AbstractSchemaModel;

  @jsonMember(AnyT)
  public displayName!: string | Array<LanguageMap>;

  @jsonMember(AnyT)
  public description!: string | Array<LanguageMap>;

  @jsonMember
  public comment!: string;

  constructor(id: string) {
    super(id, "CommandPayload");
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return CommandPayloadComponent;
  }

  // Must exist on the class being deserialized.
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