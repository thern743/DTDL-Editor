import 'reflect-metadata';
import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { CustomDeserializerParams } from 'typedjson/lib/types/metadata';
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { CommandCapabilityModel } from './CommandCapabilityModel';
import { ComponentCapabilityModel } from './ComponentCapabilityModel';
import { ICapabilityModel } from "./ICapabilityModel";
import { PropertyCapabilityModel } from './PropertyCapabilityModel';
import { RelationshipCapabilityModel } from './RelationshipCapabilityModel';
import { TelemetryCapabilityModel } from './TelemetryCapabilityModel';

@jsonObject
export class InterfaceCapabilityModel extends AbstractCapabilityModel {
  @jsonMember({ name: '@id' })
  public id!: string;

  @jsonMember({ name: '@type' })
  public type: string = "Interface";

  @jsonMember
  public displayName!: string;

  @jsonMember
  public description!: string;
  
  @jsonMember
  public comment!: string;

  // Interface specific
  @jsonMember({ name: '@context' })
  public context: string = "dtmi:dtdl:context;2";  

  @jsonMember
  public extends!: string;

  @jsonArrayMember(AbstractCapabilityModel, { deserializer: InterfaceCapabilityModel.interfaceCapabilityDeserializer } )
  public contents: ICapabilityModel[];

  constructor(displayName: string) {
    super(displayName);
    this.contents = new Array<ICapabilityModel>();
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
    let capabilities = this.contents.filter(x => x.type === type);
    return capabilities;
  }

  public static interfaceCapabilityDeserializer(json: Array<any>, params: CustomDeserializerParams) {
    let result = json.map((value: any) => {      
      switch(value["@type"]) {
        case "Property":          
          return params.fallback(value, PropertyCapabilityModel);
          break;
        case "Command":
          return params.fallback(value, CommandCapabilityModel);
          break;
        case "Telemetry":
          return params.fallback(value, TelemetryCapabilityModel);
          break;
        case "Component":
          return params.fallback(value, ComponentCapabilityModel);
          break;
        case "Relationship":
          return params.fallback(value, RelationshipCapabilityModel);
          break;
        default:
          break;          
      }      
    });

    return result;
  }
}