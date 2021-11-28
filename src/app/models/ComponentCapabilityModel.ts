import 'reflect-metadata';
import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from './AbstractCapabilityModel';

@jsonObject
export class ComponentCapabilityModel extends AbstractCapabilityModel {
  @jsonMember({ name: '@id' })
  public id!: string;

  @jsonArrayMember(String, { name: '@type' })
  public type: Array<string> = ["Component"];

  @jsonMember 
  public name!: string;

  @jsonMember 
  public displayName!: string;

  @jsonMember 
  public description!: string;

  @jsonMember 
  public comment!: string;

  // Component specific
  @jsonMember 
  public schema!: string;  

  constructor(id: string) {
    super(id, "Component");
  }
}
