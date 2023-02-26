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
    this.form = this.toFormGroup(model);
  }

  public toFormGroup(model: TelemetryCapabilityModel): FormGroup {
    let form = this.formBuilder.group({
      id: [model.id, [this._validationService.validDtmi()]],
      type: [model.type],
      displayName: [model.displayName],
      comment: [model.comment],
      description: [model.description],
      // Telemetry specific
      name: [model.name],
      schema: [model.schema],
      unit: [model.unit]
    });

    return form;
  }
}

