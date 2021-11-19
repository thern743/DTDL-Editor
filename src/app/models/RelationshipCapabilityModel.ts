import 'reflect-metadata';
import { jsonMember, jsonObject, jsonArrayMember } from "typedjson";
import { ICapabilityModel } from './ICapabilityModel';
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { CustomDeserializerParams } from 'typedjson/lib/types/metadata';

@jsonObject
export class RelationshipCapabilityModel extends AbstractCapabilityModel {
  @jsonMember({ name: '@id' })
  public id!: string;

  @jsonMember({ name: '@type' }) 
  public type: string = "Relationship";

  @jsonMember 
  public name!: string;

  @jsonMember 
  public displayName!: string;

  @jsonMember 
  public description!: string;

  @jsonMember 
  public comment!: string;

  // Relationship specific
  @jsonMember 
  public minMultiplicity!: number;  

  @jsonMember 
  public maxMultiplicity!: number;  

  @jsonMember 
  public target!: string;

  @jsonMember 
  public writable!: boolean;
  
  @jsonArrayMember(AbstractCapabilityModel, { deserializer: RelationshipCapabilityModel.interfaceCapabilityDeserializer } )
  public properties: ICapabilityModel[];

  constructor(id: string) {
    super(id, "Relationship");
    this.properties = new Array<ICapabilityModel>();
  }

  public static interfaceCapabilityDeserializer(json: Array<{prop: string; shouldDeserialize: boolean}>, params: CustomDeserializerParams) {
    let result = json.filter(value => !value.shouldDeserialize).map(value => params.fallback(value, AbstractCapabilityModel));
    return result;
  }
}
