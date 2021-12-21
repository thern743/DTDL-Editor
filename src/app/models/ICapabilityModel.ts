import { SemanticTypeArray } from "./SemanticTypeArray";

export interface ICapabilityModel {
    id: string;
    type: SemanticTypeArray;
    displayName: string;
    description: string;
    comment: string;
}