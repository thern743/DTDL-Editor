import 'reflect-metadata';
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { jsonMember, jsonObject } from "typedjson";
import { CommandCapability } from "./CommandCapability";
import { ComponentCapability } from "./ComponentCapability";
import { ICapability } from "./ICapability";
import { PropertyCapability } from "./PropertyCapability";
import { RelationshipCapability } from "./RelationshipCapability";
import { TelemetryCapability } from "./TelemetryCapability";

@jsonObject
export class InterfaceCapability implements ICapability {
  index: number = -1;
  @jsonMember id: string = "";
  @jsonMember type: string = "Interface";
  @jsonMember name: string = "";
  @jsonMember displayName: string = "";
  @jsonMember description: string = "";
  @jsonMember comment: string = "";
  // Interface specific
  @jsonMember context: string = "dtmi:dtdl:context;2";  
  @jsonMember extends: string = "";
  @jsonMember contents: ICapability[]; //TODO: Figure out how to treat as Set 
  
  form!: FormGroup;

  constructor(public formBuilder: FormBuilder) {  
    this.contents = new Array<ICapability>();   
  }
  
  get commands(): CommandCapability[] {
    return this.contents.filter(x => x.type === "Command") as CommandCapability[];
  }

  get properties(): PropertyCapability[] {
    return this.contents.filter(x => x.type === "Property") as PropertyCapability[];
  }

  get telemetries(): TelemetryCapability[] {
    return this.contents.filter(x => x.type === "Telemetry") as TelemetryCapability[];
  }

  get components(): ComponentCapability[] {
    return this.contents.filter(x => x.type === "Component") as ComponentCapability[];
  }

  get relationships(): RelationshipCapability[] {
    return this.contents.filter(x => x.type === "Relationship") as RelationshipCapability[];
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
      // Interface specific
      context: [this.context],
      extends: [this.extends],
      contents: this.formBuilder.array(this.contents)
    });

    return this.form;
  }

  getValue(): InterfaceCapability {
    this.index = -1;
    this.id = this.form.get("id")?.value;
    this.type = this.form.get("type")?.value;
    this.name = this.form.get("name")?.value;
    this.displayName = this.form.get("displayName")?.value;
    this.description = this.form.get("description")?.value;
    this.comment = this.form.get("comment")?.value;
    // Interface specific
    this.context = this.form.get("context")?.value;  
    this.extends = this.form.get("extends")?.value;

    let temp = this.form.get("contents") as FormArray;
    
    temp.controls.forEach((control) => {
      this.contents.push(control.value);
    });

    return this;
  }
}