import { ComponentType } from "@angular/cdk/portal";
import { jsonObject } from "typedjson";
import { PrimitiveSchemaComponent } from "../../primitive-schema/primitive-schema.component";
import { AbstractSchemaModel } from "../AbstractSchemaModel";

@jsonObject
export class DurationSchemaCapabilityModel extends AbstractSchemaModel {
  constructor(id: string) {
    super(id, "Duration");
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return PrimitiveSchemaComponent;
  }
}