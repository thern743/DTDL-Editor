import 'reflect-metadata';
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { AbstractSchemaModel } from './AbstractSchemaModel';

// TODO: Remove @type output in the JSON-LD for EnumValue
//       See: https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md#enumvalue
//       Strictly speaking the DTDL spec does not have a @type value for EnumValue. Currently, this does
//       not cause any problems with the validator but will cause failures when importing if the value is
//       saved on the output.
@jsonObject
export class EnumValueCapabilityModel extends AbstractSchemaModel {
  @jsonMember
  public name!: string;

  @jsonMember(AnyT)
  public enumValue!: number | string;

  constructor(id: string) {
    super(id, "EnumValue");
  }
}