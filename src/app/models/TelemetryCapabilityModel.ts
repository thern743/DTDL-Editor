import 'reflect-metadata';
import { jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { SemanticTypeArray } from './SemanticTypeArray';

@jsonObject
export class TelemetryCapabilityModel extends AbstractCapabilityModel {
  @jsonMember 
  public  name!: string;

  @jsonMember 
  public schema!: AbstractCapabilityModel;

  // No SerDes
  public semanticType!: string;

  @jsonMember 
  public unit!: string;

  constructor(id: string) {
    super(id, "Telemetry");
    this.type = new SemanticTypeArray("Telemetry");
  }
}