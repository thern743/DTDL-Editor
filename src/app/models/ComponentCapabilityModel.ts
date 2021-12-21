import 'reflect-metadata';
import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { SemanticTypeArray } from './SemanticTypeArray';

@jsonObject
export class ComponentCapabilityModel extends AbstractCapabilityModel {
  @jsonMember({ name: '@id' })
  public id!: string;

  @jsonMember({ name: '@type' })
  public type: SemanticTypeArray = new SemanticTypeArray(["Component"]);

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
