import 'reflect-metadata';
import { FormBuilder, FormGroup } from "@angular/forms";
import { jsonObject } from "typedjson";
import { ICapabilityDto } from './ICapabilityDto';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { TelemetryCapabilityDto } from './TelemetryCapabilityDto';

@jsonObject
export class TelemetryCapabilityFormControl extends AbstractCapabilityFormControl<TelemetryCapabilityDto> {
  public index: number = -1;
  public formBuilder: FormBuilder
  public capability: TelemetryCapabilityDto;  
  public form!: FormGroup;

  constructor(formBuilder: FormBuilder) {  
    super();
    this.formBuilder = formBuilder;   
    this.capability = new TelemetryCapabilityDto();
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

