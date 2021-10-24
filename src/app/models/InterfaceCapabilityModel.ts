import 'reflect-metadata';
import { jsonArrayMember, jsonMember, jsonObject, jsonSetMember, toJson } from "typedjson";
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { ICapabilityModel } from "./ICapabilityModel";

@jsonObject
export class InterfaceCapabilityModel implements ICapabilityModel {
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

    @jsonArrayMember(AbstractCapabilityFormControl)
    contents: ICapabilityModel[];

    constructor() {
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
        let capabilities = [...this.contents].filter(x => x.type === type);
        return capabilities;
      }
}