import { ICapabilityModel } from "./ICapabilityModel";

export class AbstractCapabilityModel implements ICapabilityModel {
    public id!: string;
    public type!: string;
    public name!: string;
    public displayName!: string;
    public description!: string;
    public comment!: string;

    constructor(name: string) {
        this.name = name;
    }
}
