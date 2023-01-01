import 'reflect-metadata';
import { ComponentType } from '@angular/cdk/portal';
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { TelemetryComponent } from '../telemetry/telemetry.component';
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { CustomDeserializerParams } from 'typedjson/lib/types/metadata';
import { ArraySchemaCapabilityModel } from './ArraySchemaCapabilityModel';
import { EnumSchemaCapabilityModel } from './EnumSchemaCapabilityModel';
import { MapSchemaCapabilityModel } from './MapSchemaCapabilityModel';
import { ObjectSchemaCapabilityModel } from './ObjectSchemaCapabilityModel';
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

  public static schemaDeserializer(value: string | AbstractSchemaModel, params: CustomDeserializerParams) {
    if (!value) return;
    let schema = typeof value === 'string' ? value : params.fallback(value, AbstractSchemaModel).type;

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