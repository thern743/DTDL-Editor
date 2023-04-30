
import { AbstractSchemaModel } from './AbstractSchemaModel';

export class MapKeyCapabilityModel<TCapabilityModel extends AbstractSchemaModel> extends AbstractSchemaModel {
  public name!: string;

  public schema!: string | TCapabilityModel;

  constructor(id: string, schemaModel: TCapabilityModel) {
    super(id, "MapKey");
    this.schema = schemaModel;
  }
}