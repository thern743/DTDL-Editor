import 'reflect-metadata';
import { ComponentType } from '@angular/cdk/portal';
import { jsonMember, jsonObject } from "typedjson";
import { CommandComponent } from '../command/command.component';
import { AbstractCapabilityModel } from './AbstractCapabilityModel';

@jsonObject
export class CommandCapabilityModel extends AbstractCapabilityModel {
  @jsonMember 
  public name!: string;

  @jsonMember 
  public commandType!: string;

  // TODO: Implement Command request object
  @jsonMember 
  public request: any;

  // TODO: Implement Command response object
  @jsonMember 
  public response: any;

  constructor(id: string) {
    super(id, "Command");
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return CommandComponent;
  }
}