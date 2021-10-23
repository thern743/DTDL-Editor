import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { CommandCapabilityFormControl } from "./CommandCapabilityFormControl";
import { ComponentCapabilityFormControl } from "./ComponentCapabilityFormControl";
import { PropertyCapabilityFormControl } from "./PropertyCapabilityFormControl";
import { RelationshipCapabilityFormControl } from "./RelationshipCapabilityFormControl";
import { TelemetryCapabilityFormControl } from "./TelemetryCapabilityFormControl";
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { InterfaceCapabilityDto } from './InterfaceCapabilityDto';
import { ICapabilityDto } from './ICapabilityDto';
import { ICapabilityFormControl } from "./ICapabilityFormControl";

export class InterfaceCapabilityFormControl extends AbstractCapabilityFormControl<InterfaceCapabilityDto> {
  public contents: ICapabilityFormControl<ICapabilityDto>[];
  
  constructor(formBuilder: FormBuilder) {  
    super(formBuilder);
    this.contents = new Array<ICapabilityFormControl<ICapabilityDto>>();
    this.capability = new InterfaceCapabilityDto();
  }
  
  // get commands(): CommandCapabilityFormControl[] {
  //   return [...this.capability.contents].filter(x => x.capability.type === "Command") as CommandCapabilityFormControl[];
  // }

  // get properties(): PropertyCapabilityFormControl[] {
  //   return [...this.capability.contents].filter(x => x.capability.type === "Property") as PropertyCapabilityFormControl[];
  // }

  // get telemetries(): TelemetryCapabilityFormControl[] {
  //   return [...this.capability.contents].filter(x => x.capability.type === "Telemetry") as TelemetryCapabilityFormControl[];
  // }

  // get components(): ComponentCapabilityFormControl[] {
  //   return [...this.capability.contents].filter(x => x.capability.type === "Component") as ComponentCapabilityFormControl[];
  // }

  // get relationships(): RelationshipCapabilityFormControl[] {
  //   return [...this.capability.contents].filter(x => x.capability.type === "Relationship") as RelationshipCapabilityFormControl[];
  // }

  public toFormGroup(): FormGroup {
    this.form = this.formBuilder.group({
      index: [this.index],
      id: [this.capability.id],
      type: [this.capability.type],
      displayName: [this.capability.displayName],
      name: [this.capability.name],
      comment: [this.capability.comment],
      description: [this.capability.description],
      // Interface specific
      context: [this.capability.context],
      extends: [this.capability.extends],
      contents: this.formBuilder.array([...this.capability.contents])
    });

    return this.form;
  }

  public getValue(): ICapabilityDto {
    return this.capability;
  }
}