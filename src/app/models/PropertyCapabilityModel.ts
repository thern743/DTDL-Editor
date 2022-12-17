import 'reflect-metadata';
import { ComponentType } from '@angular/cdk/portal';
import { jsonMember, jsonObject } from "typedjson";
import { PropertyComponent } from '../property/property.component';
import { AbstractCapabilityModel } from './AbstractCapabilityModel';

@jsonObject
export class PropertyCapabilityModel extends AbstractCapabilityModel {  
  @jsonMember 
  public name!: string;

  @jsonMember 
  public schema!: AbstractCapabilityModel;

  public semanticType!: string;

  @jsonMember 
  public unit!: string;

  @jsonMember 
  public writable: boolean = false;

  constructor(id: string) {
    super(id, "Property");
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return PropertyComponent;
  }
}
