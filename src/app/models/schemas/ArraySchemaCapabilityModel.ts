import 'reflect-metadata';
import { ComponentType } from "@angular/cdk/portal";
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { ArraySchemaComponent } from "../../array-schema/array-schema.component";
import { AbstractSchemaModel } from '../AbstractSchemaModel';
import { AbstractCapabilityModel } from '../AbstractCapabilityModel';
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

  public resolveSchemaComponentType(): ComponentType<any> {
    return ArraySchemaComponent;
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