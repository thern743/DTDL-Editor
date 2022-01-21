import 'reflect-metadata';
import { jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { SemanticTypeArray } from './SemanticTypeArray';

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
    this.type = new SemanticTypeArray("Command");
  }
}