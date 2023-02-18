import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";

export interface IModelFactory {
    createModel(type: string, name: string): AbstractCapabilityModel | undefined;
}