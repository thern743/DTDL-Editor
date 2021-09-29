import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapability } from "./ICapability";

export class PropertyCapability implements ICapability {
  index: number = -1;
  id: string = "";
  type: string = "Property";
  name: string = "";
  displayName: string = "";
  description: string = "";
  comment: string = "";
  // Property specific
  schema: string = "";  
  semanticType: string = "";
  writable: boolean = false;

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
      // Property specific
      schema: [this.schema],
      semanticType: [this.semanticType],
      writable: [this.writable],
    });
  }
}
