import 'reflect-metadata';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapability } from "./ICapability";
import { jsonMember, jsonObject } from "typedjson";

@jsonObject
export class ComponentCapability implements ICapability {
  index: number = -1;
  @jsonMember id: string = "";
  @jsonMember type: string = "Component";
  @jsonMember name: string = "";
  @jsonMember displayName: string = "";
  @jsonMember description: string = "";
  @jsonMember comment: string = "";
  // Component specific
  @jsonMember schema: string = "";  

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
      // Component specific
      schema: [this.schema]
    });

    return this.form;
  }

  getValue(): ComponentCapability {
    this.index = -1;
    this.id = this.form.get("id")?.value;
    this.type = this.form.get("type")?.value;
    this.name = this.form.get("name")?.value;
    this.displayName = this.form.get("displayName")?.value;
    this.description = this.form.get("description")?.value;
    this.comment = this.form.get("comment")?.value;
    // Component specific
    this.schema = this.form.get("schema")?.value;

    return this;
  }
}
