import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapability } from "./ICapability";

export class RelationshipCapability implements ICapability {
  index: number = -1;
  id: string = "";
  type: string = "Relationship";
  name: string = "";
  displayName: string = "";
  description: string = "";
  comment: string = "";
  // Relationship specific
  minMultiplicity: number = 0;  
  maxMultiplicity: number = 0;  
  target: string = "";
  writable: boolean = false;
  properties: ICapability[] = [];

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
      // Relationship specific
      minMultiplicity: [this.minMultiplicity],
      maxMultiplicity: [this.maxMultiplicity],
      target: [this.target],
      writable: [this.writable],
      properties: this.fb.array(this.properties)
    });

    return this.form;
  }

  getValue(): RelationshipCapability {
    this.index = -1;
    this.id = this.form.get("id")?.value;
    this.type = this.form.get("type")?.value;
    this.name = this.form.get("name")?.value;
    this.displayName = this.form.get("displayName")?.value;
    this.description = this.form.get("description")?.value;
    this.comment = this.form.get("comment")?.value;
    // Relationship specific
    this.minMultiplicity = this.form.get("minMultiplicity")?.value;
    this.maxMultiplicity = this.form.get("maxMultiplicity")?.value;
    this.target = this.form.get("target")?.value;
    this.writable = this.form.get("writable")?.value;
    this.properties = this.form.get("properties")?.value;

    return this;
  }
}
