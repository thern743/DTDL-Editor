import 'reflect-metadata';
import { jsonMember, jsonObject } from "typedjson";
import { ICapabilityDto } from './ICapabilityDto';

@jsonObject
export class PropertyCapabilityDto implements ICapabilityDto {
  @jsonMember id: string = "";
  @jsonMember type: string = "Property";
  @jsonMember name: string = "";
  @jsonMember displayName: string = "";
  @jsonMember description: string = "";
  @jsonMember comment: string = "";
  // Property specific
  @jsonMember schema: string = "";  
  @jsonMember semanticType: string = "";
  @jsonMember writable: boolean = false;
}
