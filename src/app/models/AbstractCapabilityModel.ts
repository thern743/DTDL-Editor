import { ICapabilityModel } from "./ICapabilityModel";

export class AbstractCapabilityDto implements ICapabilityModel {
    public id!: string;
    public type!: string;
    public name!: string;
    public displayName!: string;
    public description!: string;
    public comment!: string;
}
