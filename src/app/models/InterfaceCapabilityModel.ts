
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { ICapabilityModel } from "./interfaces/ICapabilityModel";
import { AbstractSchemaModel } from './AbstractSchemaModel';

export class InterfaceCapabilityModel extends AbstractCapabilityModel {
  public "@context": string | Array<string>;  

  public extends?: string | Array<string>;

  public contents: Array<AbstractCapabilityModel>;

  public schemas?: Array<AbstractSchemaModel>;

  constructor(id: string, context: string | Array<string>) {
    super(id, "Interface");
    this["@context"] = context;
    this.contents = new Array<AbstractCapabilityModel>();
    this.schemas = new Array<AbstractSchemaModel>();
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
    let capabilities = this.contents.filter(x => x["@type"].indexOf(type) > -1);
    return capabilities;
  }
}