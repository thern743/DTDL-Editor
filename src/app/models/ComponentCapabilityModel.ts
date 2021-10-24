import 'reflect-metadata';
import { jsonMember, jsonObject } from "typedjson";
import { ICapabilityModel } from './ICapabilityModel';

@jsonObject
export class ComponentCapabilityModel implements ICapabilityModel {
  @jsonMember id: string = "";
  @jsonMember type: string = "Component";
  @jsonMember name: string = "";
  @jsonMember displayName: string = "";
  @jsonMember description: string = "";
  @jsonMember comment: string = "";
  // Component specific
  @jsonMember schema: string = "";  
}
