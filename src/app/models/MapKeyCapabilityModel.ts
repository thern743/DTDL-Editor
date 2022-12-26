import { ComponentType } from "@angular/cdk/portal";
import { jsonMember } from "typedjson";
import { MapKeyComponent } from "../map-schema/map-key/map-key.component";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

export class MapKeyCapabilityModel<TCapabilityModel extends AbstractCapabilityModel> extends AbstractCapabilityModel {
    @jsonMember
    public name!: string;

    @jsonMember
    public schema: TCapabilityModel;

    constructor(id: string, schemaModel: TCapabilityModel) {
        // TODO: Remove use of hard-coded index for determining model type (MapKeyCapabilityModel)
        //       Currently the super() call on MapKeyCapabilityModel is passing `ICapabilityModel.type[0]`.
        //       This is not stable pattern and should be revamped to something more proper.
        super(id, schemaModel.type[0]);
        this.schema = schemaModel;
    }

    public resolveSchemaComponentType(): ComponentType<any> {
      return MapKeyComponent;
    }
}