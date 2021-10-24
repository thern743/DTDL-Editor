import 'reflect-metadata';
import { jsonMember, jsonObject, jsonSetMember } from "typedjson";
import { ICapabilityModel } from './ICapabilityModel';
import { AbstractCapabilityModel } from './AbstractCapabilityModel';

@jsonObject
export class RelationshipCapabilityModel implements ICapabilityModel {
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
  @jsonSetMember(AbstractCapabilityModel) properties: Set<ICapabilityModel>;

  constructor() {
    this.properties = new Set<ICapabilityModel>();
  }
}
