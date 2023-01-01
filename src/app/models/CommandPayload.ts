import 'reflect-metadata';
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class CommandPayload {
  @jsonMember({ name: '@id' })
  public id!: string;

  @jsonMember
  public name!: string;

  @jsonMember(AnyT)
  public schema!: string | AbstractCapabilityModel;

  @jsonMember
  public displayName!: string;

  @jsonMember
  public description!: string;

  @jsonMember
  public comment!: string;
}