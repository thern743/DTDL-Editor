import 'reflect-metadata';
import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { SemanticTypeArray } from './SemanticTypeArray';

@jsonObject
export class CommandCapabilityModel extends AbstractCapabilityModel {
  @jsonMember({ name: '@id' }) 
  public id!: string;

  @jsonMember({ name: '@type' })
  public type: SemanticTypeArray = new SemanticTypeArray(["Command"]);

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