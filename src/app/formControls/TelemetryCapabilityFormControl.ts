import { FormBuilder, FormGroup } from "@angular/forms";
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { TelemetryCapabilityModel } from '../models/TelemetryCapabilityModel';
import { ValidationService } from "../services/validation/validation-service.service";

export class TelemetryCapabilityFormControl extends AbstractCapabilityFormControl<TelemetryCapabilityModel> {  
  private _validationService: ValidationService;
  
  constructor(model: TelemetryCapabilityModel, validationService: ValidationService, formBuilder: FormBuilder) {  
    super(formBuilder);
    this._validationService = validationService;
    this.model = model;
    this.form = this.toFormGroup();
  }

  public toFormGroup(): FormGroup {
    let form = this.formBuilder.group({
      id: [this.model.id, [this._validationService.validDtmi()]],
      type: this.formBuilder.array([...this.model.type]),
      displayName: [this.model.displayName],
      comment: [this.model.comment],
      description: [this.model.description],
      // Telemetry specific
      name: [this.model.name],
      schema: [this.model.schema],
      unit: [this.model.unit]
    });

    return form;
  }
}

