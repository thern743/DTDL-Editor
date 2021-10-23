import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapabilityDto } from './ICapabilityDto';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { TelemetryCapabilityDto } from './TelemetryCapabilityDto';

export class TelemetryCapabilityFormControl extends AbstractCapabilityFormControl<TelemetryCapabilityDto> {
  
  constructor(formBuilder: FormBuilder) {  
    super(formBuilder);
    this.capability = new TelemetryCapabilityDto();
    this.toFormGroup();
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
      // Telemetry specific
      schema: [this.capability.schema],
      semanticType: [this.capability.semanticType]
    });

    return this.form;
  }

  public getValue(): ICapabilityDto {
    return this.capability;
  }
}

