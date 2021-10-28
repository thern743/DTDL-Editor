import { jsonObject, jsonMember } from 'typedjson';

/**
 * Object Schema Model is a self refrential field
 * which is used to model the object schema documented here : 
 * https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md#object
 */
@jsonObject
export class ObjectSchemaModel { 
    @jsonMember public id!: string;
    @jsonMember public name!: string; 
    @jsonMember public description!: string; 
    @jsonMember public displayName!: string; 
    @jsonMember public comment!: string; 
    @jsonMember public schema!: string;
    @jsonMember public fields!: ObjectSchemaModel[];
}