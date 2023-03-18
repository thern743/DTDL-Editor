import { CustomDeserializerParams } from "typedjson/lib/types/metadata";
import { AbstractSchemaModel } from "./AbstractSchemaModel";
import { CommandCapabilityModel } from "./CommandCapabilityModel";
import { ComponentCapabilityModel } from "./ComponentCapabilityModel";
import { PropertyCapabilityModel } from "./PropertyCapabilityModel";
import { RelationshipCapabilityModel } from "./RelationshipCapabilityModel";
import { ArraySchemaCapabilityModel } from "./schemas/ArraySchemaCapabilityModel";
import { EnumSchemaCapabilityModel } from "./schemas/EnumSchemaCapabilityModel";
import { MapSchemaCapabilityModel } from "./schemas/MapSchemaCapabilityModel";
import { ObjectSchemaCapabilityModel } from "./schemas/ObjectSchemaCapabilityModel";
import { TelemetryCapabilityModel } from "./TelemetryCapabilityModel";

export class TypeDeserializers {

  public static interfaceCapabilityDeserializer(json: Array<any>, params: CustomDeserializerParams): any {
    let result = json.map((value: any) => {
      // TODO: SemanticTypeArray TypedJSON.mapType() isn't being used correctly
      //       See class SemanticTypeArray. The deserialization logic there should be executing when
      //       deserializing this type but it's not being triggered. It may need an explicit `deserializer` option
      //       to be set on the `@jsonMember` attribute.
      let type = typeof value["@type"] === 'string' ? [value["@type"]] : value["@type"];
      if (!(type instanceof Array)) return;

      // TODO: Use a proper pattern for checking the content type when deserializing
      //       Right now each content type (Property, Command, Telemetry, etc) is hard-coded
      //       in `InterfaceCapabilityModel.interfaceCapabilityDeserializer()` method.
      //       There should be some form of delegation to these types that can be wired up for
      //       TypedJSON to handle.
      switch (type[0]) {
        case "Property":
          return params.fallback(value, PropertyCapabilityModel);
        case "Command":
          return params.fallback(value, CommandCapabilityModel);
        case "Telemetry":
          return params.fallback(value, TelemetryCapabilityModel);
        case "Component":
          return params.fallback(value, ComponentCapabilityModel);
        case "Relationship":
          return params.fallback(value, RelationshipCapabilityModel);
        default:
          break;
      }
    });

    return result;
  }

  public static schemaDeserializer(value: string | AbstractSchemaModel, params: CustomDeserializerParams): any {
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

  public static relationshipCapabilityDeserializer(json: Array<{ prop: string; shouldDeserialize: boolean }>, params: CustomDeserializerParams): any {
    let result = json.filter(value => !value.shouldDeserialize).map(value => params.fallback(value, PropertyCapabilityModel));
    return result;
  }

  public static arrayOrStringDeserializer(json: Array<string> | string, params: CustomDeserializerParams) {
    if (typeof json === 'string')
      return new Array<string>(json);
    else if (json instanceof Array)
      return new Array<string>(...json)
    else
      return params.fallback(json, Object)
  }
}