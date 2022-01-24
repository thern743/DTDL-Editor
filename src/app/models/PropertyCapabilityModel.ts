import 'reflect-metadata';
import { jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { SemanticTypeArray } from './SemanticTypeArray';

@jsonObject
export class PropertyCapabilityModel extends AbstractCapabilityModel {  
  @jsonMember 
  public name!: string;

  @jsonMember 
  public schema!: AbstractCapabilityModel;

  public schemaType!: string;

  public semanticType!: string;

  @jsonMember 
  public unit!: string;

  @jsonMember 
  public writable: boolean = false;

  constructor(id: string) {
    super(id, "Property");
    this.type = new SemanticTypeArray("Property");
  }
}
