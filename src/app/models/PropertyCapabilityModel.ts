import 'reflect-metadata';
import { jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from './AbstractCapabilityModel';

@jsonObject
export class PropertyCapabilityModel extends AbstractCapabilityModel {
  @jsonMember({ name: '@id' })
  public id!: string;

  @jsonMember({ name: '@type' })
  public type: string = "Property";

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

  @jsonMember 
  public semanticType!: string;

  @jsonMember 
  public writable: boolean = false;
}
