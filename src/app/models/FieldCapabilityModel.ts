import 'reflect-metadata';
import { ComponentType } from "@angular/cdk/portal";
import { AnyT, jsonMember, jsonObject } from "typedjson";
import { FieldComponent } from "../field/field.component";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

@jsonObject
export class FieldCapabilityModel extends AbstractCapabilityModel {
  @jsonMember
  public name!: string;

  @jsonMember(AnyT)
  public schema!: string | AbstractCapabilityModel;

  constructor(id: string) {
    super(id, "Field");
  }

  public resolveSchemaComponentType(): ComponentType<any> {
    return FieldComponent;
  }
}