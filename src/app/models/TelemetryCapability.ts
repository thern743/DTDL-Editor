import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapability } from "./ICapability";

export class TelemetryCapability implements ICapability {
  id: string = "";
  type: string = "";
  name: string = "";
  displayName: string = "";
  description: string = "";
  comment: string = "";

  schema: string = "";
  semanticType = "";

  constructor(private fb: FormBuilder) {  
    
  }

  newFormItem(id: string, name?: string): FormGroup {
    return this.fb.group({
      id: [id],
      type: [''],
      displayName: [''],
      name: [name],
      comment: [''],
      description: [''],

      schema: [''],
      semanticType: ['']
    });
  }
}

