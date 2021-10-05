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
      // Property specific
      schema: [this.schema],
      semanticType: [this.semanticType],
      writable: [this.writable]
    });

    return this.form;
  }

  getValue(): PropertyCapability {
    this.index = -1;
    this.id = this.form.get("id")?.value;
    this.type = this.form.get("type")?.value;
    this.name = this.form.get("name")?.value;
    this.displayName = this.form.get("displayName")?.value;
    this.description = this.form.get("description")?.value;
    this.comment = this.form.get("comment")?.value;
    // Property specific
    this.schema = this.form.get("schema")?.value;
    this.semanticType = this.form.get("semanticType")?.value;
    this.writable = this.form.get("writable")?.value;

    return this;
  }
}
