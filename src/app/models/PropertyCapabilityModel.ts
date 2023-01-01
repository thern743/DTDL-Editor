import 'reflect-metadata';
import { ComponentType } from '@angular/cdk/portal';
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { PropertyComponent } from '../property/property.component';
import { AbstractCapabilityModel } from './AbstractCapabilityModel';

@jsonObject
export class PropertyCapabilityModel extends AbstractCapabilityModel {  
  @jsonMember 
  public name!: string;

  @jsonMember(AnyT) 
  public schema!: string | AbstractCapabilityModel; 

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
