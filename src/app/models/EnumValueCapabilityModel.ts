
import { AbstractSchemaModel } from './AbstractSchemaModel';

// TODO: Remove @type output in the JSON-LD for EnumValue
//       See: https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md#enumvalue
//       Strictly speaking the DTDL spec does not have a @type value for EnumValue. Currently, this does
//       not cause any problems with the validator but will cause failures when importing if the value is
//       saved on the output.
export class EnumValueCapabilityModel extends AbstractSchemaModel {
  public name!: string;

  public enumValue!: number | string;

  constructor(id: string) {
    super(id, "EnumValue");
  }
}