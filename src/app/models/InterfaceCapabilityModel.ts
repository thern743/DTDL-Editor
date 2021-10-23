import 'reflect-metadata';
import { jsonMember, jsonObject, jsonSetMember, toJson } from "typedjson";
import { AbstractCapabilityDto } from './AbstractCapabilityModel';
import { ICapabilityModel } from "./ICapabilityModel";

@jsonObject
export class InterfaceCapabilityDto implements ICapabilityModel {
    @jsonMember
    public id: string = "";

    @jsonMember
    public type: string = "Interface";

    @jsonMember
    public name: string = "";

    @jsonMember
    public displayName: string = "";

    @jsonMember
    public description: string = "";
    
    @jsonMember
    comment: string = "";

    // Interface specific
    @jsonMember
    public context: string = "dtmi:dtdl:context;2";  

    @jsonMember
    public extends: string = "";

    @jsonSetMember(AbstractCapabilityDto)
    contents: Set<ICapabilityModel>;

    constructor() {
        this.contents = new Set<ICapabilityModel>();
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
        let capabilities = [...this.contents].filter(x => x.type === type);
        return capabilities;
      }
}