import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractSchemaModel } from "./AbstractSchemaModel";

export class SchemaModalResult {
  public schemaFormControl!: AbstractCapabilityFormControl<AbstractSchemaModel>;
  public interfaceSchema!: boolean;

  constructor(schemaFormControl: AbstractCapabilityFormControl<AbstractSchemaModel>, interfaceSchema: boolean) {
    this.schemaFormControl = schemaFormControl;
    this.interfaceSchema = interfaceSchema;

  }
}