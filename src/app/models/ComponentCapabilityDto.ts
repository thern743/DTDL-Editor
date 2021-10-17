import 'reflect-metadata';
import { jsonMember, jsonObject } from "typedjson";
import { ICapabilityDto } from './ICapabilityDto';

@jsonObject
export class ComponentCapabilityDto implements ICapabilityDto {
  @jsonMember id: string = "";
  @jsonMember type: string = "Component";
  @jsonMember name: string = "";
  @jsonMember displayName: string = "";
  @jsonMember description: string = "";
  @jsonMember comment: string = "";
  // Component specific
  @jsonMember schema: string = "";  
}
