import 'reflect-metadata';
import { jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from './AbstractCapabilityModel';

@jsonObject
export class ComponentCapabilityModel extends AbstractCapabilityModel {
  @jsonMember id!: string;
  @jsonMember type: string = "Component";
  @jsonMember name!: string;
  @jsonMember displayName!: string;
  @jsonMember description!: string;
  @jsonMember comment!: string;
  // Component specific
  @jsonMember schema!: string;  
}
