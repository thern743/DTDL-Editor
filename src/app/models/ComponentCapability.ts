import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapability } from "./ICapability";

export class ComponentCapability implements ICapability {
  index: number = -1;
  id: string = "";
  type: string = "Component";
  name: string = "";
  displayName: string = "";
  description: string = "";
  comment: string = "";
  // Component specific
  schema: string = "";  

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
