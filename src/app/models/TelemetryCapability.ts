import 'reflect-metadata';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapability } from "./ICapability";
import { jsonMember, jsonObject } from "typedjson";

@jsonObject
export class TelemetryCapability implements ICapability {
  index: number = -1;
  @jsonMember id: string = "";
  @jsonMember type: string = "Telemetry";
  @jsonMember name: string = "";
  @jsonMember displayName: string = "";
  @jsonMember description: string = "";
  @jsonMember comment: string = "";
  // Telemetry specific
  @jsonMember schema: string = "";
  @jsonMember semanticType: string = "";

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {  
    
  }

  toFormGroup(): FormGroup {
    this.form = this.formBuilder.group({
      index: [this.index],
      id: [this.id],
      type: [this.type],
      displayName: [this.displayName],
      name: [this.name],
      comment: [this.comment],
      description: [this.description],
      // Telemetry specific
      schema: [this.schema],
      semanticType: [this.semanticType]
    });

    return this.form;
  }

  getValue(): TelemetryCapability {
    this.index = -1;
    this.id = this.form.get("id")?.value;
    this.type = this.form.get("type")?.value;
    this.name = this.form.get("name")?.value;
    this.displayName = this.form.get("displayName")?.value;
    this.description = this.form.get("description")?.value;
    this.comment = this.form.get("comment")?.value;
    // Telemetry specific
    this.schema = this.form.get("schema")?.value;
    this.semanticType = this.form.get("semanticType")?.value;

    return this;
  }
}

