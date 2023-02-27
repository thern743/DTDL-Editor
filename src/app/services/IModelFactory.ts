import { AbstractSchemaModel } from "../models/AbstractSchemaModel";

export interface IModelFactory {
    createModel(type: string, name: string): AbstractSchemaModel | undefined;
}