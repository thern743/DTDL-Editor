import 'reflect-metadata';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapability } from "./ICapability";
import { jsonMember, jsonObject } from "typedjson";

@jsonObject
export class CommandCapability implements ICapability {
  index: number = -1;
  @jsonMember id: string = "";
  @jsonMember type: string = "Command";
  @jsonMember name: string = "";
  @jsonMember displayName: string = "";
  @jsonMember description: string = "";
  @jsonMember comment: string = "";
  // Command specific
  @jsonMember commandType: string = "";
  @jsonMember request: any = {};
  @jsonMember response: any = {}; 

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

