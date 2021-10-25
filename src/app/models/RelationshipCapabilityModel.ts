import 'reflect-metadata';
import { jsonMember, jsonObject, jsonSetMember } from "typedjson";
import { ICapabilityModel } from './ICapabilityModel';
import { AbstractCapabilityModel } from './AbstractCapabilityModel';

@jsonObject
export class RelationshipCapabilityModel extends AbstractCapabilityModel {
  @jsonMember id!: string;
  @jsonMember type: string = "Relationship";
  @jsonMember name!: string;
  @jsonMember displayName!: string;
  @jsonMember description!: string;
  @jsonMember comment!: string;
  // Relationship specific
  @jsonMember minMultiplicity!: number;  
  @jsonMember maxMultiplicity!: number;  
  @jsonMember target!: string;
  @jsonMember writable!: boolean;
  @jsonSetMember(AbstractCapabilityModel) properties: Set<ICapabilityModel>;

  constructor(name: string) {
    super(name);
    this.properties = new Set<ICapabilityModel>();
  }
}
