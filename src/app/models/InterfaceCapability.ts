import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { CommandCapability } from "./CommandCapability";
import { ICapability } from "./ICapability";
import { PropertyCapability } from "./PropertyCapability";
import { TelemetryCapability } from "./TelemetryCapability";

export class InterfaceCapability implements ICapability {
  index: number = -1;
  id: string = "";
  type: string = "Interface";
  name: string = "";
  displayName: string = "";
  description: string = "";
  comment: string = "";
  // Interface specific
  context: string = "dtmi:dtdl:context;2";  
  extends: string = "";
  contents: ICapability[];

  form!: FormGroup;

  constructor(private fb: FormBuilder) {  
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

  toFormGroup(): FormGroup {
    this.form = this.fb.group({
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
      contents: this.fb.array(this.contents)
    });

    return this.form;
  }
}
