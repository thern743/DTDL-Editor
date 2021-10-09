import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapability } from "./ICapability";

export class TelemetryCapability implements ICapability {
  index: number = -1;
  id: string = "";
  type: string = "Telemetry";
  name: string = "";
  displayName: string = "";
  description: string = "";
  comment: string = "";
  // Telemetry specific
  schema: string = "";
  semanticType: string = "";

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

