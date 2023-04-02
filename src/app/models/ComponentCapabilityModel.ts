
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { AbstractSchemaModel } from './AbstractSchemaModel';

export class ComponentCapabilityModel extends AbstractCapabilityModel {
  public name!: string;

  public schema!: string | AbstractSchemaModel;  

  constructor(id: string) {
    super(id, "Component");
  }

}
