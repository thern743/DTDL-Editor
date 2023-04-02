
import { AbstractSchemaModel } from './AbstractSchemaModel';

export class MapValueCapabilityModel<TCapabilityModel extends AbstractSchemaModel> extends AbstractSchemaModel {
  public name!: string;

  public schema!: string | AbstractSchemaModel;

  constructor(id: string, schemaModel: TCapabilityModel) {
    // TODO: Remove use of hard-coded index for determining model type (MapValueCapabilityModel)
    //       Currently the super() call on MapValueCapabilityModel is passing `ICapabilitymodel["@type"][0]`.
    //       This is not stable pattern and should be revamped to something more proper.
    super(id, schemaModel["@type"][0]);
    this.schema = schemaModel;
  }
}