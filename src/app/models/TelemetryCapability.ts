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

  constructor(private fb: FormBuilder) {  
    
  }

  toFormGroup(): FormGroup {
    return this.fb.group({
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
  }
}

