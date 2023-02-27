import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractSchemaModel } from "./AbstractSchemaModel";

export class SchemaModalParameters {
  public title: string;
  public schemaType: string;
  public schemaFormControl: AbstractCapabilityFormControl<AbstractSchemaModel>;

  constructor(title: string, schemaType: string, schemaFormControl: AbstractCapabilityFormControl<AbstractSchemaModel>) {
    this.title = title;
    this.schemaType = schemaType;
    this.schemaFormControl = schemaFormControl;
  }
}