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

  commands: CommandCapability[];
  properties: PropertyCapability[];
  telemetries: TelemetryCapability[];

  constructor(private fb: FormBuilder) {  
    this.commands = new Array<CommandCapability>();
    this.properties = new Array<PropertyCapability>();
    this.telemetries = new Array<TelemetryCapability>();
  }
  
  toFormGroup(): FormGroup {
    return this.fb.group({
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
      contents: this.contentsFormArray
    });
  }

  get contents(): any[] {
    return new Array<any>(...this.commands, ...this.properties, ...this.telemetries).sort(x => (x as ICapability)?.index);
  }

  get contentsFormArray(): FormArray {
    return new FormArray(this.contents);
  }
}
