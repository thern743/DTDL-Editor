import { CustomDeserializerParams } from "typedjson/lib/types/metadata";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
import { CommandCapabilityModel } from "./CommandCapabilityModel";
import { ComponentCapabilityModel } from "./ComponentCapabilityModel";
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

  public static relationshipCapabilityDeserializer(json: Array<{ prop: string; shouldDeserialize: boolean }>, params: CustomDeserializerParams) {
    let result = json.filter(value => !value.shouldDeserialize).map(value => params.fallback(value, AbstractCapabilityModel));
    return result;
  }
}