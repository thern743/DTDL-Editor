import 'reflect-metadata';
import { jsonMember, jsonObject, jsonSetMember } from "typedjson";
import { ICapabilityDto } from './ICapabilityDto';
import { AbstractCapabilityDto } from './AbstractCapabilityDto';

@jsonObject
export class RelationshipCapabilityDto implements ICapabilityDto {
  @jsonMember id: string = "";
  @jsonMember type: string = "Relationship";
  @jsonMember name: string = "";
  @jsonMember displayName: string = "";
  @jsonMember description: string = "";
  @jsonMember comment: string = "";
  // Relationship specific
  @jsonMember minMultiplicity: number = 0;  
  @jsonMember maxMultiplicity: number = 0;  
  @jsonMember target: string = "";
  @jsonMember writable: boolean = false;
  @jsonSetMember(AbstractCapabilityDto) properties: Set<ICapabilityDto>;

  constructor() {
    this.properties = new Set<ICapabilityDto>();
  }
}
