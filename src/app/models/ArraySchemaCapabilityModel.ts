import 'reflect-metadata';
import { ComponentType } from "@angular/cdk/portal";
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { ArraySchemaComponent } from "../array-schema/array-schema.component";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
import { CustomDeserializerParams } from 'typedjson/lib/types/metadata';
import { EnumSchemaCapabilityModel } from './EnumSchemaCapabilityModel';
import { MapSchemaCapabilityModel } from './MapSchemaCapabilityModel';
import { ObjectSchemaCapabilityModel } from './ObjectSchemaCapabilityModel';

@jsonObject
export class ArraySchemaCapabilityModel extends AbstractCapabilityModel {
  @jsonMember(AnyT, { deserializer: ArraySchemaCapabilityModel.schemaDeserializer })
  public elementSchema!: string | AbstractCapabilityModel;

  constructor(id: string) {
    super(id, "Array");
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return ArraySchemaComponent;
  }

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