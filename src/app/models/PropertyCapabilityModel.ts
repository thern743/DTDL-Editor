
import { AbstractCapabilityModel } from './AbstractCapabilityModel';
import { AbstractSchemaModel } from './AbstractSchemaModel';

export class PropertyCapabilityModel extends AbstractCapabilityModel {  
  public name!: string;

  public schema!: string | AbstractSchemaModel; 

  public unit!: string;

  public writable: boolean = false;

  constructor(id: string) {
    super(id, "Property");
  }
}
