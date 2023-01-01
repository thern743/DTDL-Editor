import 'reflect-metadata';
import { ComponentType } from '@angular/cdk/portal';
import { jsonMember, jsonObject } from "typedjson";
import { CommandComponent } from '../command/command.component';
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { CommandPayload } from './CommandPayload';

@jsonObject
export class CommandCapabilityModel extends AbstractCapabilityModel {
  @jsonMember 
  public name!: string;

  @jsonMember 
  public commandType!: string;

  // TODO: Implement CommandPayload for Command requests and responses
  //       See https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md#commandpayload
  @jsonMember 
  public request!: CommandPayload;

  @jsonMember 
  public response!: CommandPayload;

  constructor(id: string) {
    super(id, "Command");
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return CommandComponent;
  }
}