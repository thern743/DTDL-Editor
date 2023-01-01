import 'reflect-metadata';
import { ComponentType } from '@angular/cdk/portal';
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { ComponentComponent } from '../component/component.component';
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { CustomDeserializerParams } from 'typedjson/lib/types/metadata';
import { ArraySchemaCapabilityModel } from './ArraySchemaCapabilityModel';
import { EnumSchemaCapabilityModel } from './EnumSchemaCapabilityModel';
import { MapSchemaCapabilityModel } from './MapSchemaCapabilityModel';
import { ObjectSchemaCapabilityModel } from './ObjectSchemaCapabilityModel';
import { AbstractSchemaModel } from './AbstractSchemaModel';

@jsonObject
export class ComponentCapabilityModel extends AbstractCapabilityModel {
  @jsonMember 
  public name!: string;

  @jsonMember(AnyT, { deserializer: ArraySchemaCapabilityModel.schemaDeserializer })
  public schema!: string | AbstractSchemaModel;  

  constructor(id: string) {
    super(id, "Component");
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return ComponentComponent;
  }

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
