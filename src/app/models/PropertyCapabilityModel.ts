import 'reflect-metadata';
import { ComponentType } from '@angular/cdk/portal';
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { PropertyComponent } from '../property/property.component';
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { ArraySchemaCapabilityModel } from './ArraySchemaCapabilityModel';
import { CustomDeserializerParams } from 'typedjson/lib/types/metadata';
import { EnumSchemaCapabilityModel } from './EnumSchemaCapabilityModel';
import { MapSchemaCapabilityModel } from './MapSchemaCapabilityModel';
import { ObjectSchemaCapabilityModel } from './ObjectSchemaCapabilityModel';

@jsonObject
export class PropertyCapabilityModel extends AbstractCapabilityModel {  
  @jsonMember 
  public name!: string;

  @jsonMember(AnyT, { deserializer: PropertyCapabilityModel.schemaDeserializer })
  public schema!: string | AbstractCapabilityModel; 

  @jsonMember 
  public unit!: string;

  @jsonMember 
  public writable: boolean = false;

  constructor(id: string) {
    super(id, "Property");
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return PropertyComponent;
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
