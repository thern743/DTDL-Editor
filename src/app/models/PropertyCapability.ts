import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapability } from "./ICapability";

export class PropertyCapability implements ICapability {
  id: string = "";
  type: string = "";
  name: string = "";
  displayName: string = "";
  description: string = "";
  comment: string = "";

  schema: string = "";  
  semanticType: string = "";
  writable: boolean = false;

  constructor(private fb: FormBuilder) {  
    
  }
  
  newFormItem(id: string, name?: string): FormGroup {
    return this.fb.group({
      id: [id],
      type: [''],
      name: [name],
      displayName: [''],
      description: [''],
      comment: [''],

      schema: [''],
      semanticType: [''],
      writable: [''],
    });
  }
}
