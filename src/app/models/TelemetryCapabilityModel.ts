import 'reflect-metadata';
import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { SemanticTypeArray } from './SemanticTypeArray';

@jsonObject
export class TelemetryCapabilityModel extends AbstractCapabilityModel {
  @jsonMember({ name: '@id' })
  public id!: string;

  @jsonMember({ name: '@type' })
  public type: SemanticTypeArray = new SemanticTypeArray(["Telemetry"]);

  @jsonMember 
  public  name!: string;

  @jsonMember 
  public displayName!: string;

  @jsonMember 
  public description!: string;

  @jsonMember 
  public comment!: string;

  // Telemetry specific
  @jsonMember 
  public schema!: string;

  public semanticType!: string;

  @jsonMember 
  public unit!: string;

  constructor(id: string) {
    super(id, "Telemetry");
  }
}