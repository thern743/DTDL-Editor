import { jsonObject, jsonMember, jsonArrayMember } from 'typedjson';

/**
 * Object Schema Model is a self refrential field
 * which is used to model the object schema documented here : 
 * https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md#object
 * 
 * This is needed to acommidate json seralization to the jsonLD model. 
 */
@jsonObject
export class ObjectSchemaModel { 
    @jsonMember 
    public id!: string;

    @jsonMember 
    public name!: string; 

    @jsonMember 
    public description!: string; 

    @jsonMember 
    public displayName!: string; 

    @jsonMember 
    public comment!: string; 

    @jsonMember 
    public schema!: string;

    @jsonArrayMember(ObjectSchemaModel) 
    public fields!: ObjectSchemaModel[];

    public level: number; 

    constructor(name: string, level: number) {
        this.name = name; 
        this.level = level; 
        this.fields = new Array<ObjectSchemaModel>();
    }
}