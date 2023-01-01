import 'reflect-metadata';
import { jsonMember, jsonObject, jsonArrayMember } from "typedjson";
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { CustomDeserializerParams } from 'typedjson/lib/types/metadata';
import { RelationshipComponent } from '../relationship/relationship.component';
import { ComponentType } from '@angular/cdk/portal';

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
  
  @jsonArrayMember(AbstractCapabilityModel, { deserializer: RelationshipCapabilityModel.interfaceCapabilityDeserializer } )
  public properties: Array<AbstractCapabilityModel>;

  constructor(id: string) {
    super(id, "Relationship");
    this.properties = new Array<AbstractCapabilityModel>();
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return RelationshipComponent;
  }

  public static interfaceCapabilityDeserializer(json: Array<{prop: string; shouldDeserialize: boolean}>, params: CustomDeserializerParams) {
    let result = json.filter(value => !value.shouldDeserialize).map(value => params.fallback(value, AbstractCapabilityModel));
    return result;
  }
}
