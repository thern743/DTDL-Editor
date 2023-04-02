
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { AbstractSchemaModel } from './AbstractSchemaModel';

export class TelemetryCapabilityModel extends AbstractCapabilityModel {
  public name!: string;

  public schema!: string | AbstractSchemaModel; 

  public unit!: string;

  constructor(id: string) {
    super(id, "Telemetry");
  }
}