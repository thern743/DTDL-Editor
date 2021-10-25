import 'reflect-metadata';
import { jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from './AbstractCapabilityModel';

@jsonObject
export class TelemetryCapabilityModel extends AbstractCapabilityModel {
  @jsonMember id!: string;
  @jsonMember type: string = "Telemetry";
  @jsonMember name!: string;
  @jsonMember displayName!: string;
  @jsonMember description!: string;
  @jsonMember comment!: string;
  // Telemetry specific
  @jsonMember schema!: string;
  @jsonMember semanticType!: string;
}