import 'reflect-metadata';
import { jsonMember, jsonObject } from "typedjson";
import { AbstractSchemaModel } from "../AbstractSchemaModel";

@jsonObject
export class PrimitiveSchemaCapabilityModel extends AbstractSchemaModel {
  @jsonMember
  public schema!: string;

  constructor(id: string) {
    super(id, "primitive");
  }
}