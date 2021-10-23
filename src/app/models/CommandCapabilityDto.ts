import 'reflect-metadata';
import { jsonMember, jsonObject } from "typedjson";
import { ICapabilityDto } from './ICapabilityDto';

@jsonObject
export class CommandCapabilityDto implements ICapabilityDto {
    @jsonMember id: string = "";
    @jsonMember type: string = "Command";
    @jsonMember name: string = "";
    @jsonMember displayName: string = "";
    @jsonMember description: string = "";
    @jsonMember comment: string = "";
    // Command specific
    @jsonMember commandType: string = "";
    @jsonMember request: any = {};
    @jsonMember response: any = {};
}