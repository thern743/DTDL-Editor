import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";

export interface IModelFactory {
    registerModels(name: string): void;
    registerMapModels(): void;
    createModel(name: string): AbstractCapabilityModel | undefined;
}