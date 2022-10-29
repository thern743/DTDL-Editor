import { jsonMember } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";
// TODO: Remove rendering of Type for EnumValue
export class MapKeyCapabilityModel<TCapabilityModel extends AbstractCapabilityModel> extends AbstractCapabilityModel {
    @jsonMember
    public name!: string;

    @jsonMember
    public schema: TCapabilityModel;

    constructor(id: string, schemaModel: TCapabilityModel) {
        super(id, "MapKey");
        this.schema = schemaModel;
    }
}