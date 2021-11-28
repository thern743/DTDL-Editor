import 'reflect-metadata';
import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from './AbstractCapabilityModel';

@jsonObject
export class CommandCapabilityModel extends AbstractCapabilityModel {
  @jsonMember({ name: '@id' }) 
  public id!: string;

  @jsonArrayMember(String, { name: '@type' })
  public type: Array<string> = ["Command"];

  @jsonMember 
  public name!: string;

  @jsonMember 
  public displayName!: string;

  @jsonMember 
  public description!: string;

  @jsonMember 
  public comment!: string;

  // Command specific
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
}