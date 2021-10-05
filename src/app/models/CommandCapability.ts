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

  getValue(): CommandCapability {
    this.index = -1;
    this.id = this.form.get("id")?.value;
    this.type = this.form.get("type")?.value;
    this.name = this.form.get("name")?.value;
    this.displayName = this.form.get("displayName")?.value;
    this.description = this.form.get("description")?.value;
    this.comment = this.form.get("comment")?.value;
    // Command specific
    this.commandType = this.form.get("commandType")?.value;
    this.request = this.form.get("request")?.value;
    this.response = this.form.get("response")?.value;

    return this;
  }
}

