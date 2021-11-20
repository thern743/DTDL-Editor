import 'reflect-metadata';
import { jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from './AbstractCapabilityModel';

@jsonObject
export class TelemetryCapabilityModel extends AbstractCapabilityModel {
  @jsonMember({ name: '@id' })
  public id!: string;

  @jsonMember({ name: '@type' })
  public type: string = "Telemetry";

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

  @jsonMember 
  public semanticType!: string;

  @jsonMember 
  public unit!: string;

  constructor(id: string) {
    super(id, "Telemetry");
  }
}