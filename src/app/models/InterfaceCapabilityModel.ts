import 'reflect-metadata';
import { ComponentType } from '@angular/cdk/portal';
import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { CustomDeserializerParams } from 'typedjson/lib/types/metadata';
import { InterfaceComponent } from '../interface/interface.component';
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { CommandCapabilityModel } from './CommandCapabilityModel';
import { ComponentCapabilityModel } from './ComponentCapabilityModel';
import { ICapabilityModel } from "./ICapabilityModel";
import { PropertyCapabilityModel } from './PropertyCapabilityModel';
import { RelationshipCapabilityModel } from './RelationshipCapabilityModel';
import { TelemetryCapabilityModel } from './TelemetryCapabilityModel';

// TODO: Add support for Interface Schemas
//       See: https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md#interface-schemas
@jsonObject
export class InterfaceCapabilityModel extends AbstractCapabilityModel {
  @jsonMember({ name: '@context' })
  public context: string = "dtmi:dtdl:context;2";  

  @jsonMember
  public extends!: string;

  @jsonArrayMember(AbstractCapabilityModel, { deserializer: InterfaceCapabilityModel.interfaceCapabilityDeserializer } )
  public contents: ICapabilityModel[];

  constructor(id: string, context: string) {
    super(id, "Interface");
    this.context = context;
    this.contents = new Array<ICapabilityModel>();
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return InterfaceComponent;
  }

  get commands(): ICapabilityModel[] {        
    return this.capabilityByType("Command");
  }

  get properties(): ICapabilityModel[] {
    return this.capabilityByType("Property");
  }

  get telemetries(): ICapabilityModel[] {
    return this.capabilityByType("Telemetry");
  }

  get components(): ICapabilityModel[] {
    return this.capabilityByType("Component");
  }

  get relationships(): ICapabilityModel[] {
    return this.capabilityByType("Relationship");
  }

  private capabilityByType(type: string): ICapabilityModel[] {    
    let capabilities = this.contents.filter(x => x.type.indexOf(type) > -1);
    return capabilities;
  }

  public static interfaceCapabilityDeserializer(json: Array<any>, params: CustomDeserializerParams) {    
    let result = json.map((value: any) => {
      // TODO: SemanticTypeArray TypedJSON.mapType() isn't being used correctly
      //       See class SemanticTypeArray. The deserialization logic there should be executing when
      //       deserializing this type but it's not being triggered. It may need an explicit `deserializer` option
      //       to be set on the `@jsonMember` attribute.
      let type = typeof value["@type"] === 'string' ? [value["@type"]] : value["@type"];
      if(!(type instanceof Array)) return;

      // TODO: Use a proper pattern for checking the content type when deserializing
      //       Right now each content type (Property, Command, Telemetry, etc) is hard-coded
      //       in `InterfaceCapabilityModel.interfaceCapabilityDeserializer()` method.
      //       There should be some form of delegation to these types that can be wired up for
      //       TypedJSON to handle.
      switch(type[0]) {
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
}