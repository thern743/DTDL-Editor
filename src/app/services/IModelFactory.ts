import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";

export interface IModelFactory {
    registerModels(type: string, name: string): void;
    createModel(type: string, name: string): AbstractCapabilityModel | undefined;
}