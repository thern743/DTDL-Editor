import 'reflect-metadata';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapability } from "./ICapability";
import { jsonMember, jsonObject } from "typedjson";

@jsonObject
export class RelationshipCapability implements ICapability {
  index: number = -1;
  @jsonMember id: string = "";
  @jsonMember type: string = "Relationship";
  @jsonMember name: string = "";
  @jsonMember displayName: string = "";
  @jsonMember description: string = "";
  @jsonMember comment: string = "";
  // Relationship specific
  @jsonMember minMultiplicity: number = 0;  
  @jsonMember maxMultiplicity: number = 0;  
  @jsonMember target: string = "";
  @jsonMember writable: boolean = false;
  @jsonMember properties: ICapability[] = [];

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
      // Relationship specific
      minMultiplicity: [this.minMultiplicity],
      maxMultiplicity: [this.maxMultiplicity],
      target: [this.target],
      writable: [this.writable],
      properties: this.formBuilder.array(this.properties)
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
