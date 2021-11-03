import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapabilityModel } from '../models/ICapabilityModel';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { TelemetryCapabilityModel } from '../models/TelemetryCapabilityModel';

export class TelemetryCapabilityFormControl extends AbstractCapabilityFormControl<TelemetryCapabilityModel> {
  
  constructor(model: TelemetryCapabilityModel, formBuilder: FormBuilder) {  
    super(formBuilder);
    this.model = model;
    this.form = this.toFormGroup();
  }

  public toFormGroup(): FormGroup {
    let form = this.formBuilder.group({
      id: [this.model.id],
      type: [this.model.type],
      displayName: [this.model.displayName],
      name: [this.model.name],
      comment: [this.model.comment],
      description: [this.model.description],
      // Telemetry specific
      schema: [this.model.schema],
      semanticType: [this.model.semanticType]
    });

    return form;
  }
}

