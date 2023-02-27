import 'reflect-metadata';
import { jsonMember, jsonObject, jsonArrayMember } from "typedjson";
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { RelationshipComponent } from '../relationship/relationship.component';
import { ComponentType } from '@angular/cdk/portal';
import { TypeDeserializers } from './TypedDeserializers';

@jsonObject
export class RelationshipCapabilityModel extends AbstractCapabilityModel {
  @jsonMember 
  public name!: string;

  @jsonMember 
  public minMultiplicity!: number;  

  @jsonMember 
  public maxMultiplicity!: number;  

  @jsonMember 
  public target!: string;

  @jsonMember 
  public writable!: boolean;
  
  @jsonArrayMember(AbstractCapabilityModel, { deserializer: TypeDeserializers.relationshipCapabilityDeserializer } )
  public properties: Array<AbstractCapabilityModel>;

  constructor(id: string) {
    super(id, "Relationship");
    this.properties = new Array<AbstractCapabilityModel>();
  }
}
