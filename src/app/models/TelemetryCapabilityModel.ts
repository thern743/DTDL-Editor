import 'reflect-metadata';
import { ComponentType } from '@angular/cdk/portal';
import { jsonMember, jsonObject } from "typedjson";
import { TelemetryComponent } from '../telemetry/telemetry.component';
import { AbstractCapabilityModel } from './AbstractCapabilityModel';

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
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return TelemetryComponent;
  }
}