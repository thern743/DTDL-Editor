import 'reflect-metadata';
import { jsonArrayMember, jsonObject } from "typedjson";
import { FieldCapabilityModel } from "../FieldCapabilityModel";
import { AbstractSchemaModel } from '../AbstractSchemaModel';

@jsonObject
export class ObjectSchemaCapabilityModel extends AbstractSchemaModel {
  @jsonArrayMember(FieldCapabilityModel)
  public fields!: Array<FieldCapabilityModel>;

  constructor(id: string) {
    super(id, "Object");
    this.fields = new Array<FieldCapabilityModel>();
  }
}