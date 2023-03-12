import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { PropertyCapabilityModel } from '../models/PropertyCapabilityModel';
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { InterfaceCapabilityFormControl } from "./InterfaceCapabilityFormControl";

export class PropertyCapabilityFormControl extends AbstractCapabilityFormControl<PropertyCapabilityModel> {
  private _validationService: ValidationService;
  
  constructor(interfaceInstance: InterfaceCapabilityFormControl, model: PropertyCapabilityModel, validationService: ValidationService, formBuilder: UntypedFormBuilder) {  
    super(formBuilder);
    this._validationService = validationService;
    this.model = model;
    this.form = this.toFormGroup(model);
    this.interface = interfaceInstance;
  }

  public toFormGroup(model: PropertyCapabilityModel): UntypedFormGroup {
    let form = this.formBuilder.group({
      id: [model.id, [this._validationService.validDtmi()]],
      type: [model.type],
      displayName: [model.displayName],
      comment: [model.comment],
      description: [model.description],
      // Property specific
      name: [model.name],
      schema: [model.schema],
      unit: [model.unit],
      writable: [model.writable]
    });

    return form;
  }
}
