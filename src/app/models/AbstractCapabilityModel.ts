import 'reflect-metadata';
import { ComponentType } from "@angular/cdk/portal";
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { CustomDeserializerParams } from "typedjson/lib/types/metadata";
import { ICapabilityModel } from "./interfaces/ICapabilityModel";
import { AbstractSchemaModel } from './AbstractSchemaModel';

@jsonObject
export abstract class AbstractCapabilityModel implements ICapabilityModel {
    @jsonMember({ name: '@id' })
    public id!: string;

    @jsonMember(AnyT, { name: '@type', deserializer: AbstractCapabilityModel.typeDeserializer })
    public type!: string | Array<string>;

    @jsonMember
    public displayName!: string;

    @jsonMember
    public description!: string;

    @jsonMember
    public comment!: string;

    constructor(id: string, type: string) {
        this.id = id;
        this.type = new Array<string>(type);
    }

    public abstract resolveSchemaComponentType(): ComponentType<any>;

    public static typeDeserializer(json: Array<string> | string, params: CustomDeserializerParams) {
      if (typeof json === 'string')
        return new Array<string>(json);
      else if (json instanceof Array)
        return new Array<string>(...json)
      else
        return params.fallback(json, Object)
    }

    public static schemaDeserializer(value: string | AbstractSchemaModel, params: CustomDeserializerParams) {
      if (!value) return;
      let schema = typeof value === 'string' ? value : value.type;
  
      switch (schema?.toLocaleLowerCase()) {
        // case "array":
        //   return params.fallback(value, ArraySchemaCapabilityModel);
        // case "map":
        //   return params.fallback(value, MapSchemaCapabilityModel);
        // case "enum":
        //   return params.fallback(value, EnumSchemaCapabilityModel);
        // case "object":
        //   return params.fallback(value, ObjectSchemaCapabilityModel);
        // default:
        //   return value;
      }
    }
}