import 'reflect-metadata';
import { AnyT, jsonMember } from "typedjson";
import { AbstractSchemaModel } from './AbstractSchemaModel';

export class MapKeyCapabilityModel<TCapabilityModel extends AbstractSchemaModel> extends AbstractSchemaModel {
  @jsonMember
  public name!: string;

  @jsonMember(AnyT)
  public schema: string | TCapabilityModel;

  constructor(id: string, schemaModel: TCapabilityModel) {
    // TODO: Remove use of hard-coded index for determining model type (MapKeyCapabilityModel)
    //       Currently the super() call on MapKeyCapabilityModel is passing `ICapabilityModel.type[0]`.
    //       This is not stable pattern and should be revamped to something more proper.
    super(id, schemaModel.type[0]);
    this.schema = schemaModel;
  }
}