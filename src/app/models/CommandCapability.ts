import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapability } from "./ICapability";

export class CommandCapability implements ICapability {
  id: string = "";
  type: string = "";
  name: string = "";
  displayName: string = "";
  description: string = "";
  comment: string = "";

  commandType: string = "";
  request: any = {};
  response: any = {}; 

  constructor(private fb: FormBuilder) {  
    
  }
  
  newFormItem(id: string, name?: string): FormGroup {
    return this.fb.group({
      id: [id],
      type: [''],
      displayName: [name],
      name: [''],
      comment: [''],
      description: [''],

      commandType: [''],
      request: [{}],
      response: [{}]
    });
  }
}

