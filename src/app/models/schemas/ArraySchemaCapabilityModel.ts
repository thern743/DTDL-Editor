import 'reflect-metadata';
import { ComponentType } from "@angular/cdk/portal";
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { ArraySchemaComponent } from "../../array-schema/array-schema.component";
import { AbstractSchemaModel } from '../AbstractSchemaModel';
import { AbstractCapabilityModel } from '../AbstractCapabilityModel';

@jsonObject
export class ArraySchemaCapabilityModel extends AbstractSchemaModel {
  @jsonMember(AnyT, { deserializer: AbstractCapabilityModel.schemaDeserializer })
  public elementSchema!: string | AbstractSchemaModel;

  constructor(id: string) {
    super(id, "Array");
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return ArraySchemaComponent;
  }
}