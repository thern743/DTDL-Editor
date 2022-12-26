import { ComponentType } from "@angular/cdk/portal";
import { jsonMember } from "typedjson";
import { MapValueComponent } from "../map-schema/map-value/map-value.component";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

export class MapValueCapabilityModel<TCapabilityModel extends AbstractCapabilityModel> extends AbstractCapabilityModel {
    @jsonMember
    public name!: string;

    @jsonMember
    public schema: TCapabilityModel;

    constructor(id: string, schemaModel: TCapabilityModel) {
        // TODO: Remove use of hard-coded index for determining model type (MapValueCapabilityModel)
        //       Currently the super() call on MapValueCapabilityModel is passing `ICapabilityModel.type[0]`.
        //       This is not stable pattern and should be revamped to something more proper.
        super(id, schemaModel.type[0]);
        this.schema = schemaModel;
    }

    public resolveSchemaComponentType(): ComponentType<any> {
      return MapValueComponent;
    }
}