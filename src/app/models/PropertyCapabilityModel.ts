import 'reflect-metadata';
import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { SemanticTypeArray } from './SemanticTypeArray';

@jsonObject
export class PropertyCapabilityModel extends AbstractCapabilityModel {
  @jsonMember({ name: '@id' })
  public id!: string;

  @jsonMember({ name: '@type' })
  public type: SemanticTypeArray = new SemanticTypeArray(["Property"]);

  @jsonMember 
  public name!: string;

  @jsonMember 
  public displayName!: string;

  @jsonMember 
  public description!: string;

  @jsonMember 
  public comment!: string;
  
  // Property specific
  @jsonMember 
  public schema!: string;

  public semanticType!: string;

  @jsonMember 
  public unit!: string;

  @jsonMember 
  public writable: boolean = false;

  constructor(id: string) {
    super(id, "Property");
  }
}
