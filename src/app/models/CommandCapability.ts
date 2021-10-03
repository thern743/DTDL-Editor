import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapability } from "./ICapability";

export class CommandCapability implements ICapability {
  index: number = -1;
  id: string = "";
  type: string = "Command";
  name: string = "";
  displayName: string = "";
  description: string = "";
  comment: string = "";
  // Command specific
  commandType: string = "";
  request: any = {};
  response: any = {}; 

  form!: FormGroup;

  constructor(private fb: FormBuilder) {  
    
  }
  
  toFormGroup(): FormGroup {
    this.form = this.fb.group({
      index: [this.index],
      id: [this.id],
      type: [this.type],
      displayName: [this.displayName],
      name: [this.name],
      comment: [this.comment],
      description: [this.description],
      // Command specific
      commandType: [this.commandType],
      request: [this.request],
      response: [this.response]
    });

    return this.form;
  }
}

