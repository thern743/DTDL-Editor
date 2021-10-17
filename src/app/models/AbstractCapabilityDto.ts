import { ICapabilityDto } from "./ICapabilityDto";

export class AbstractCapabilityDto implements ICapabilityDto {
    public id!: string;
    public type!: string;
    public name!: string;
    public displayName!: string;
    public description!: string;
    public comment!: string;
}
