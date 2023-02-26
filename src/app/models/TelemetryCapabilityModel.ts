import 'reflect-metadata';
import { ComponentType } from '@angular/cdk/portal';
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { TelemetryComponent } from '../telemetry/telemetry.component';
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { CustomDeserializerParams } from 'typedjson/lib/types/metadata';
import { ArraySchemaCapabilityModel } from './schemas/ArraySchemaCapabilityModel';
import { EnumSchemaCapabilityModel } from './schemas/EnumSchemaCapabilityModel';
import { MapSchemaCapabilityModel } from './schemas/MapSchemaCapabilityModel';
import { ObjectSchemaCapabilityModel } from './schemas/ObjectSchemaCapabilityModel';
import { AbstractSchemaModel } from './AbstractSchemaModel';

@jsonObject
export class TelemetryCapabilityModel extends AbstractCapabilityModel {
  @jsonMember 
  public  name!: string;

  @jsonMember(AnyT, { deserializer: TelemetryCapabilityModel.schemaDeserializer })
  public schema!: string | AbstractSchemaModel; 

  @jsonMember 
  public unit!: string;

  constructor(id: string) {
    super(id, "Telemetry");
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return TelemetryComponent;
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