import 'reflect-metadata';
import { ComponentType } from '@angular/cdk/portal';
import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { InterfaceComponent } from '../interface/interface.component';
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { ICapabilityModel } from "./interfaces/ICapabilityModel";
import { TypeDeserializers } from './TypedDeserializers';
import { AbstractSchemaModel } from './AbstractSchemaModel';

// TODO: Add support for Interface Schemas
//       See: https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md#interface-schemas
@jsonObject
export class InterfaceCapabilityModel extends AbstractCapabilityModel {
  @jsonMember({ name: '@context' })
  public context: string = "dtmi:dtdl:context;2";  

  @jsonMember
  public extends?: string;

  @jsonArrayMember(AbstractCapabilityModel, { deserializer: TypeDeserializers.interfaceCapabilityDeserializer } )
  public contents: Array<AbstractCapabilityModel>;

  @jsonArrayMember(AbstractSchemaModel, { deserializer: TypeDeserializers.schemaDeserializer } )
  public schemas?: Array<AbstractSchemaModel>;

  constructor(id: string, context: string) {
    super(id, "Interface");
    this.context = context;
    this.contents = new Array<AbstractCapabilityModel>();
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
}