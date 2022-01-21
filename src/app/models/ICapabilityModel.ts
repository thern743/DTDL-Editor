import { SemanticTypeArray } from "./SemanticTypeArray";

export interface ICapabilityModel {
    id: string;
    type: SemanticTypeArray | String;
    displayName: string;
    description: string;
    comment: string;
}