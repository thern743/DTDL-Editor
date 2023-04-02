import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { TelemetryCapabilityModel } from '../models/TelemetryCapabilityModel';
import { ValidationService } from "../services/validation/validation-service.service";
import { InterfaceCapabilityFormControl } from "./InterfaceCapabilityFormControl";

export class TelemetryCapabilityFormControl extends AbstractCapabilityFormControl<TelemetryCapabilityModel> {  
  private _validationService: ValidationService;
  
  constructor(interfaceInstance: InterfaceCapabilityFormControl, model: TelemetryCapabilityModel, validationService: ValidationService, formBuilder: UntypedFormBuilder) {  
    super(formBuilder);
    this._validationService = validationService;
    this.model = model;
    this.form = this.toFormGroup(model);
    this.interface = interfaceInstance;
  }

  public toFormGroup(model: TelemetryCapabilityModel): UntypedFormGroup {
    let form = this.formBuilder.group({
      id: [model["@id"], [this._validationService.validDtmi()]],
      type: [model["@type"]],
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

