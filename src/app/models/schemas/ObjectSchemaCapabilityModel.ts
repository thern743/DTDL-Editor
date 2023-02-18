import 'reflect-metadata';
import { ComponentType } from "@angular/cdk/portal";
import { jsonArrayMember, jsonObject } from "typedjson";
import { ObjectSchemaComponent } from "../../object-schema/object-schema.component";
import { FieldCapabilityModel } from "../FieldCapabilityModel";
import { AbstractSchemaModel } from '../AbstractSchemaModel';
import { RegisterModelFactoryMethod } from '../../reflection/ReflectionMetadata';
import { MapValueCapabilityModel } from '../MapValueCapabilityModel';

@jsonObject
export class ObjectSchemaCapabilityModel extends AbstractSchemaModel {
  @jsonArrayMember(FieldCapabilityModel)
  public fields!: Array<FieldCapabilityModel>;

  constructor(id: string) {
    super(id, "Object");
    this.fields = new Array<FieldCapabilityModel>();
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return ObjectSchemaComponent;
  }
}