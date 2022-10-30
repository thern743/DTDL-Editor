import { jsonMember } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

export class MapValueCapabilityModel<TCapabilityModel extends AbstractCapabilityModel> extends AbstractCapabilityModel {
    @jsonMember
    public name!: string;

    @jsonMember
    public schema: TCapabilityModel;

    constructor(id: string, schemaModel: TCapabilityModel) {
        // TODO: Fix this hard-coded indexing.
        super(id, schemaModel.type[0]);
        this.schema = schemaModel;
    }
}