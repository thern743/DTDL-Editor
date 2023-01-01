import { CustomDeserializerParams } from "typedjson/lib/types/metadata";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
import { ArraySchemaCapabilityModel } from "./ArraySchemaCapabilityModel";
import { CommandCapabilityModel } from "./CommandCapabilityModel";
import { ComponentCapabilityModel } from "./ComponentCapabilityModel";
import { EnumSchemaCapabilityModel } from "./EnumSchemaCapabilityModel";
import { MapSchemaCapabilityModel } from "./MapSchemaCapabilityModel";
import { ObjectSchemaCapabilityModel } from "./ObjectSchemaCapabilityModel";
import { PropertyCapabilityModel } from "./PropertyCapabilityModel";
import { RelationshipCapabilityModel } from "./RelationshipCapabilityModel";
import { TelemetryCapabilityModel } from "./TelemetryCapabilityModel";

export class TypeDeserializers {

  public static interfaceCapabilityDeserializer(json: Array<any>, params: CustomDeserializerParams) {
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

  public static typeDeserializer(json: Array<string> | string, params: CustomDeserializerParams) {
    if (typeof json === 'string')
      return new Array<string>(json);
    else if (json instanceof Array)
      return new Array<string>(...json)
    else
      return params.fallback(json, Object)
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