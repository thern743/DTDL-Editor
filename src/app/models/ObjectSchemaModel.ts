import { ImplicitReceiver } from '@angular/compiler';
import 'reflect-metadata';
import { jsonObject, jsonMember, jsonArrayMember } from 'typedjson';
import { ICapabilityModel } from './ICapabilityModel';

/**
 * Object Schema Model is a self refrential field
 * which is used to model the object schema documented here : 
 * https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md#object
 * 
 * This is needed to acommidate json seralization to the jsonLD model. 
 */
@jsonObject
export class ObjectSchemaModel implements ICapabilityModel { 
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

    public type: string = "Schema";


    constructor(name: string, level: number) {
        this.name = name; 
        this.level = level; 
        this.fields = new Array<ObjectSchemaModel>();
    }
}