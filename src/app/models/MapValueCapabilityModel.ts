
import { AbstractSchemaModel } from './AbstractSchemaModel';

export class MapValueCapabilityModel<TCapabilityModel extends AbstractSchemaModel> extends AbstractSchemaModel {
  public name!: string;

  public schema!: string | AbstractSchemaModel;

  constructor(id: string, schemaModel: TCapabilityModel) {
    super(id, "MapValue");
    this.schema = schemaModel;
  }
}