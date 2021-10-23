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
  
  get commands(): ICapabilityDto[] {        
    return this.capabilityByType("Command");
  }

  get properties(): ICapabilityDto[] {
    return this.capabilityByType("Property");
  }

  get telemetries(): ICapabilityDto[] {
    return this.capabilityByType("Telemetry");
  }

  get components(): ICapabilityDto[] {
    return this.capabilityByType("Component");
  }

  get relationships(): ICapabilityDto[] {
    return this.capabilityByType("Relationship");
  }

  private capabilityByType(type: string): ICapabilityDto[] {    
    let capabilities = [...this.capability.contents].filter(x => x.type === type);
    return capabilities;
  }

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