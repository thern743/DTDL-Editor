import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";

export interface IMapFactory {
    registerMapModels(): void;
    registerMapForms(): void;
}