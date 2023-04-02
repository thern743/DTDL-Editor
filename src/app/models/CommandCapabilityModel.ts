
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { CommandPayload } from './CommandPayload';

export class CommandCapabilityModel extends AbstractCapabilityModel {
  public name!: string;

  public commandType!: string;

  public request!: CommandPayload;

  public response!: CommandPayload;

  constructor(id: string) {
    super(id, "Command");
  }
}