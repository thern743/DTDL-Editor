import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractSchemaModel } from "./AbstractSchemaModel";

export class SchemaModalParameters {
  public title: string;
  public schemaType: string;
  public schemaFormControl: AbstractCapabilityFormControl<AbstractSchemaModel>;
  public isInterfaceSchema: boolean;

  constructor(title: string, schemaType: string, schemaFormControl: AbstractCapabilityFormControl<AbstractSchemaModel>, isInterfaceSchema: boolean) {
    this.title = title;
    this.schemaType = schemaType;
    this.schemaFormControl = schemaFormControl;
    this.isInterfaceSchema = isInterfaceSchema;
  }
}